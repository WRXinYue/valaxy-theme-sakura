export interface CardTilt {
  rx: number
  ry: number
  sx: number
  sy: number
}

export function getCardTilt(el: HTMLElement, event: MouseEvent): CardTilt | undefined {
  const rect = el.getBoundingClientRect()
  if (!rect.width || !rect.height)
    return
  const px = (event.clientX - rect.left) / rect.width
  const py = (event.clientY - rect.top) / rect.height
  return {
    rx: (0.5 - py) * 9,
    ry: (px - 0.5) * 11,
    sx: px * 100,
    sy: py * 100,
  }
}
