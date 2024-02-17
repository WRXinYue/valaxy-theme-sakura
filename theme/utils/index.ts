export function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url)
}
