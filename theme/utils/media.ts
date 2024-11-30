import noneImg from '../assets/image-404.png'

/**
 * set default img
 * @param e
 */
export function onImgError(e: Event, defaultImg = noneImg) {
  const targetEl = e.target as HTMLImageElement
  targetEl.setAttribute('data-src', targetEl.src)
  targetEl.src = defaultImg
}

export function resolveImage(data: string | string[] | boolean): string | undefined {
  if (typeof data === 'string') {
    return data
  }
  if (Array.isArray(data) && data.length > 0) {
    return data[Math.floor(Math.random() * data.length)]
  }
  return data === true ? noneImg : undefined
}

export function isVideoUrl(url: string) {
  return /\.(?:mp4|webm|ogg)$/i.test(url)
}
