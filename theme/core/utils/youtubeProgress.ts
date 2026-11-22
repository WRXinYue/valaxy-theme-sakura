import { getYouTubeId } from './media'
import { findYouTubePlayer } from './youtubePlayer'

interface YouTubeProgressOptions {
  /** 承载 iframe 的容器选择器 */
  containerSelector?: string
}

interface YouTubeInfoPayload {
  event?: string
  info?: {
    currentTime?: number
    duration?: number
  }
}

const YOUTUBE_ORIGIN = /^https:\/\/(?:www\.)?youtube(?:-nocookie)?\.com$/

/**
 * 通过 iframe 的 postMessage 协议读取 YouTube 播放进度。
 * 播放器只在收到 `listening` 握手后才向父页面推送 `infoDelivery`，
 * 因此这里在首次查询时握手一次，之后定期请求时间与时长。
 */
export class YouTubeProgressTracker {
  private readonly containerSelector: string
  private currentTime = 0
  private duration = 0
  private videoId = ''
  private lastQuery = 0
  private readonly listening = new Set<string>()

  private readonly onMessage = (event: MessageEvent) => {
    if (!YOUTUBE_ORIGIN.test(event.origin) || !event.data)
      return

    let payload: YouTubeInfoPayload | undefined
    try {
      payload = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
    }
    catch {
      return
    }

    if (!payload || payload.event !== 'infoDelivery' || !payload.info)
      return
    if (typeof payload.info.currentTime === 'number')
      this.currentTime = payload.info.currentTime
    if (typeof payload.info.duration === 'number' && payload.info.duration > 0)
      this.duration = payload.info.duration
  }

  constructor(options: YouTubeProgressOptions = {}) {
    this.containerSelector = options.containerSelector ?? '.sakura-hero-background'
  }

  start() {
    window.addEventListener('message', this.onMessage)
  }

  stop() {
    window.removeEventListener('message', this.onMessage)
  }

  /**
   * 刷新进度。
   * @returns 0~1 的播放进度；当前媒体不是 YouTube 时返回 null
   */
  update(url: string | undefined): number | null {
    if (!url)
      return null

    const id = getYouTubeId(url)
    if (!id) {
      this.videoId = ''
      this.currentTime = 0
      this.duration = 0
      return null
    }

    if (id !== this.videoId) {
      this.videoId = id
      this.currentTime = 0
      this.duration = 0
    }

    // 优先使用官方 IFrame API 的播放器实例，数据最可靠
    const player = findYouTubePlayer(id)
    if (player) {
      const duration = player.getDuration()
      const currentTime = player.getCurrentTime()
      if (Number.isFinite(duration) && duration > 0 && Number.isFinite(currentTime))
        return Math.min(1, Math.max(0, currentTime / duration))
      return 0
    }

    // 回退到 iframe postMessage 协议
    const now = Date.now()
    if (now - this.lastQuery > 500) {
      this.lastQuery = now
      const frame = this.findFrame(id)
      if (frame) {
        if (!this.listening.has(frame.id)) {
          this.listening.add(frame.id)
          this.post(frame, { event: 'listening', id: frame.id, channel: 'widget' })
        }
        this.command(frame, 'getCurrentTime')
        this.command(frame, 'getDuration')
      }
    }

    if (this.duration <= 0)
      return 0
    return Math.min(1, this.currentTime / this.duration)
  }

  private findFrame(id: string) {
    const root = document.querySelector(this.containerSelector)
    if (!root)
      return null
    const frames = root.querySelectorAll<HTMLIFrameElement>('iframe')
    return [...frames].find(frame => frame.src.includes(`/embed/${id}`)) ?? null
  }

  private command(frame: HTMLIFrameElement, func: string) {
    this.post(frame, { event: 'command', func, args: [] })
  }

  private post(frame: HTMLIFrameElement, payload: unknown) {
    frame.contentWindow?.postMessage(JSON.stringify(payload), '*')
  }
}
