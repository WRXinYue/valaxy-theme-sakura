import type { EventInfo, Options, PanInfo } from 'motion-v'
import { Gestures } from '../core/types/gestures'

export const MotionGestureKeys = Gestures.VALUES

export type MotionGestureKey = (typeof MotionGestureKeys)[number]

type MotionGesturePropName<K extends string> = `on${Capitalize<K>}`

export type MotionGestureAttrs = Pick<Options, MotionGesturePropName<MotionGestureKey>>

export interface MotionGestureAttrsOptions {
  stopPropagation?: boolean
}

export type MotionGestureHandlers<Id extends string = string> = Partial<{
  hoverStart: (id: Id, event: MouseEvent, info: EventInfo) => void
  hoverEnd: (id: Id, event: MouseEvent, info: EventInfo) => void
  pressStart: (id: Id, event: PointerEvent, info: EventInfo) => void
  press: (id: Id, event: PointerEvent, info: EventInfo) => void
  pressCancel: (id: Id, event: PointerEvent, info: EventInfo) => void
  panSessionStart: (id: Id, event: PointerEvent, info: PanInfo) => void
  panStart: (id: Id, event: PointerEvent, info: PanInfo) => void
  pan: (id: Id, event: PointerEvent, info: PanInfo) => void
  panEnd: (id: Id, event: PointerEvent, info: PanInfo) => void
  dragStart: (id: Id, event: PointerEvent, info: PanInfo) => void
  drag: (id: Id, event: PointerEvent, info: PanInfo) => void
  dragEnd: (id: Id, event: PointerEvent, info: PanInfo) => void
  directionLock: (id: Id, axis: 'x' | 'y') => void
  dragTransitionEnd: (id: Id) => void
  viewportEnter: (id: Id, entry: IntersectionObserverEntry | null) => void
  viewportLeave: (id: Id, entry: IntersectionObserverEntry | null) => void
  focus: (id: Id, event: FocusEvent) => void
  blur: (id: Id, event: FocusEvent) => void
}>

function capitalize(value: string) {
  if (!value)
    return value
  return value[0].toUpperCase() + value.slice(1)
}

function stopPropagationIfNeeded(options: MotionGestureAttrsOptions, event: Event) {
  if (options.stopPropagation)
    event.stopPropagation()
}

export function createMotionGestureAttrs<Id extends string>(
  handlers: MotionGestureHandlers<Id>,
  options: MotionGestureAttrsOptions = {},
) {
  function forHit(id: Id) {
    const attrs: MotionGestureAttrs = {}

    if (handlers.hoverStart) {
      attrs.onHoverStart = (event: MouseEvent, info: EventInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.hoverStart?.(id, event, info)
      }
    }
    if (handlers.hoverEnd) {
      attrs.onHoverEnd = (event: MouseEvent, info: EventInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.hoverEnd?.(id, event, info)
      }
    }
    if (handlers.pressStart) {
      attrs.onPressStart = (event: PointerEvent, info: EventInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.pressStart?.(id, event, info)
      }
    }
    if (handlers.press) {
      attrs.onPress = (event: PointerEvent, info: EventInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.press?.(id, event, info)
      }
    }
    if (handlers.pressCancel) {
      attrs.onPressCancel = (event: PointerEvent, info: EventInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.pressCancel?.(id, event, info)
      }
    }
    if (handlers.panSessionStart) {
      attrs.onPanSessionStart = (event: PointerEvent, info: PanInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.panSessionStart?.(id, event, info)
      }
    }
    if (handlers.panStart) {
      attrs.onPanStart = (event: PointerEvent, info: PanInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.panStart?.(id, event, info)
      }
    }
    if (handlers.pan) {
      attrs.onPan = (event: PointerEvent, info: PanInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.pan?.(id, event, info)
      }
    }
    if (handlers.panEnd) {
      attrs.onPanEnd = (event: PointerEvent, info: PanInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.panEnd?.(id, event, info)
      }
    }
    if (handlers.dragStart) {
      attrs.onDragStart = (event: PointerEvent, info: PanInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.dragStart?.(id, event, info)
      }
    }
    if (handlers.drag) {
      attrs.onDrag = (event: PointerEvent, info: PanInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.drag?.(id, event, info)
      }
    }
    if (handlers.dragEnd) {
      attrs.onDragEnd = (event: PointerEvent, info: PanInfo) => {
        stopPropagationIfNeeded(options, event)
        handlers.dragEnd?.(id, event, info)
      }
    }
    if (handlers.directionLock)
      attrs.onDirectionLock = (axis: 'x' | 'y') => handlers.directionLock?.(id, axis)
    if (handlers.dragTransitionEnd)
      attrs.onDragTransitionEnd = () => handlers.dragTransitionEnd?.(id)
    if (handlers.focus) {
      attrs.onFocus = (event: FocusEvent) => {
        stopPropagationIfNeeded(options, event)
        handlers.focus?.(id, event)
      }
    }
    if (handlers.blur) {
      attrs.onBlur = (event: FocusEvent) => {
        stopPropagationIfNeeded(options, event)
        handlers.blur?.(id, event)
      }
    }

    return attrs
  }

  function forViewport(id: Id) {
    const attrs: MotionGestureAttrs = {}
    if (handlers.viewportEnter)
      attrs.onViewportEnter = (entry: IntersectionObserverEntry | null) => handlers.viewportEnter?.(id, entry)
    if (handlers.viewportLeave)
      attrs.onViewportLeave = (entry: IntersectionObserverEntry | null) => handlers.viewportLeave?.(id, entry)
    return attrs
  }

  return { forHit, forViewport }
}

export function createMotionGestureAttrsFromEmitterPrefix<
  Id extends string,
  Emitter extends object = object,
>(emitter: Emitter, prefix: string, options?: MotionGestureAttrsOptions) {
  const handlers: MotionGestureHandlers<Id> = {}

  for (const key of MotionGestureKeys) {
    const methodName = `${prefix}${capitalize(key)}`
    const fn = (emitter as any)[methodName]
    if (typeof fn === 'function')
      (handlers as any)[key] = fn.bind(emitter)
  }

  return createMotionGestureAttrs(handlers, options)
}
