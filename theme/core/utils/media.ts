export function resolveImage(data: string | string[]): string | undefined {
  if (typeof data === 'string') {
    return data
  }
  if (Array.isArray(data) && data.length > 0) {
    return data[Math.floor(Math.random() * data.length)]
  }
}

export function isVideoUrl(url: string) {
  return /\.(?:mp4|webm|ogg)$/i.test(url)
}

const youTubeHosts = new Set([
  'youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtube-nocookie.com',
  'youtu.be',
])

const youTubeIdPattern = /^[\w-]{11}$/

export function getYouTubeId(url: string): string | null {
  if (!/^https?:\/\//i.test(url))
    return null

  let parsed: URL
  try {
    parsed = new URL(url)
  }
  catch {
    return null
  }

  const host = parsed.hostname.replace(/^www\./, '')
  if (!youTubeHosts.has(host))
    return null

  const id = host === 'youtu.be'
    ? parsed.pathname.slice(1).split('/')[0]
    : parsed.pathname === '/watch'
      ? parsed.searchParams.get('v')
      : parsed.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1]

  return id && youTubeIdPattern.test(id) ? id : null
}

export function isYouTubeUrl(url: string) {
  return !!getYouTubeId(url)
}

export function getYouTubeEmbedUrl(
  url: string,
  options: { muted?: boolean, controls?: boolean, loop?: boolean } = {},
) {
  const id = getYouTubeId(url)
  if (!id)
    return ''

  const { muted = true, controls = false, loop = true } = options
  const params = new URLSearchParams({
    autoplay: '1',
    mute: muted ? '1' : '0',
    controls: controls ? '1' : '0',
    loop: loop ? '1' : '0',
    playsinline: '1',
    rel: '0',
    iv_load_policy: '3',
  })

  if (loop)
    params.set('playlist', id)
  if (!controls)
    params.set('disablekb', '1')

  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}
