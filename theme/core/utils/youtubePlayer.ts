export interface YouTubePlayer {
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  mute: () => void
  unMute: () => void
  playVideo: () => void
  pauseVideo: () => void
  destroy: () => void
  getIframe: () => HTMLIFrameElement | null
}

interface YouTubeNamespace {
  Player: new (element: string | HTMLElement, options?: Record<string, unknown>) => YouTubePlayer
}

declare global {
  interface Window {
    YT?: YouTubeNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const API_SRC = 'https://www.youtube.com/iframe_api'

let apiPromise: Promise<YouTubeNamespace> | undefined

/**
 * 懒加载 YouTube IFrame API，多次调用只会插入一次脚本。
 */
export function loadYouTubeApi(): Promise<YouTubeNamespace> {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('YouTube IFrame API is client-only'))

  if (window.YT?.Player)
    return Promise.resolve(window.YT)

  if (apiPromise)
    return apiPromise

  apiPromise = new Promise<YouTubeNamespace>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT?.Player)
        resolve(window.YT)
      else
        reject(new Error('YouTube IFrame API failed to initialize'))
    }

    const script = document.createElement('script')
    script.src = API_SRC
    script.async = true
    script.onerror = () => reject(new Error('Failed to load YouTube IFrame API'))
    document.head.appendChild(script)
  })

  return apiPromise
}

interface PlayerEntry {
  videoId: string
  player: YouTubePlayer
}

const players = new Map<string, PlayerEntry>()

export function registerYouTubePlayer(containerId: string, videoId: string, player: YouTubePlayer) {
  players.set(containerId, { videoId, player })
}

export function unregisterYouTubePlayer(containerId: string) {
  players.delete(containerId)
}

/**
 * 按视频 id 找到当前仍然挂载在页面上的播放器实例。
 */
export function findYouTubePlayer(videoId: string) {
  for (const entry of players.values()) {
    if (entry.videoId !== videoId)
      continue
    const iframe = entry.player.getIframe()
    if (!iframe || iframe.isConnected)
      return entry.player
  }
  return null
}
