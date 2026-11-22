export const Gestures = {
  VALUES: [
    'hoverStart',
    'hoverEnd',
    'pressStart',
    'press',
    'pressCancel',
    'panSessionStart',
    'panStart',
    'pan',
    'panEnd',
    'dragStart',
    'drag',
    'dragEnd',
    'directionLock',
    'dragTransitionEnd',
    'viewportEnter',
    'viewportLeave',
    'focus',
    'blur',
  ] as const,
} as const

export type GestureType = typeof Gestures.VALUES[number]

export interface GestureEvent<T extends string = string, P = unknown> {
  type: T
  source: string
  timestamp: number
  payload?: P
}

export function createGestureEvent<T extends string, P = unknown>(type: T, source: string, payload?: P): GestureEvent<T, P> {
  return {
    type,
    source,
    timestamp: Date.now(),
    payload,
  }
}
