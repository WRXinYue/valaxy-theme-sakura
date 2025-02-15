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
