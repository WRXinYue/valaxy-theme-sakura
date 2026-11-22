import type { EventInfo, PanInfo } from 'motion-v'
import type { GestureType } from '../core/types/gestures'
import { ref } from 'vue'
import { GestureEventBus } from '../core/events'

const gestureEventBus = GestureEventBus.getInstance()

export type HeroFrameHitId
  = | 'hero'
    | 'corner-tl'
    | 'corner-tr'
    | 'corner-br'
    | 'corner-bl'
    | 'edge-top'
    | 'edge-right'
    | 'edge-bottom'
    | 'edge-left'

export interface HeroFrameHit {
  id: HeroFrameHitId
  at: number
}

export type HeroFrameGestureType = GestureType

export type HeroFrameGestureEvent
  = | {
    type: 'hoverStart' | 'hoverEnd'
    id: HeroFrameHitId
    at: number
    event: MouseEvent
    info: EventInfo
  }
  | {
    type: 'pressStart' | 'press' | 'pressCancel'
    id: HeroFrameHitId
    at: number
    event: PointerEvent
    info: EventInfo
  }
  | {
    type: 'panSessionStart' | 'panStart' | 'pan' | 'panEnd'
    id: HeroFrameHitId
    at: number
    event: PointerEvent
    info: PanInfo
  }
  | {
    type: 'dragStart' | 'drag' | 'dragEnd'
    id: HeroFrameHitId
    at: number
    event: PointerEvent
    info: PanInfo
  }
  | {
    type: 'directionLock'
    id: HeroFrameHitId
    at: number
    axis: 'x' | 'y'
  }
  | {
    type: 'dragTransitionEnd'
    id: HeroFrameHitId
    at: number
  }
  | {
    type: 'viewportEnter' | 'viewportLeave'
    id: HeroFrameHitId
    at: number
    entry: IntersectionObserverEntry | null
  }
  | {
    type: 'focus' | 'blur'
    id: HeroFrameHitId
    at: number
    event: FocusEvent
  }

type HeroFrameGestureEventInputOf<T> = T extends { at: number }
  ? Omit<T, 'at'> & { at?: number }
  : T

export type HeroFrameGestureEventInput = HeroFrameGestureEventInputOf<HeroFrameGestureEvent>

export function useHeroFrameHit() {
  const heroFrameHit = ref<HeroFrameHit | null>(null)
  const heroFrameHitSeq = ref(0)
  const heroFrameGesture = ref<HeroFrameGestureEvent | null>(null)
  const heroFrameGestureSeq = ref(0)

  function emitHeroFrameHit(id: HeroFrameHitId) {
    heroFrameHit.value = { id, at: Date.now() }
    heroFrameHitSeq.value += 1
    gestureEventBus.emitHeroFrameHit(heroFrameHit.value)
  }

  function emitHeroFrameGesture(input: HeroFrameGestureEventInput) {
    heroFrameGesture.value = { ...input, at: input.at ?? Date.now() } as HeroFrameGestureEvent
    heroFrameGestureSeq.value += 1
    gestureEventBus.emitHeroFrameGesture(heroFrameGesture.value)
  }

  function emitHeroFrameHoverStart(id: HeroFrameHitId, event: MouseEvent, info: EventInfo) {
    emitHeroFrameGesture({ type: 'hoverStart', id, event, info })
  }

  function emitHeroFrameHoverEnd(id: HeroFrameHitId, event: MouseEvent, info: EventInfo) {
    emitHeroFrameGesture({ type: 'hoverEnd', id, event, info })
  }

  function emitHeroFramePressStart(id: HeroFrameHitId, event: PointerEvent, info: EventInfo) {
    emitHeroFrameGesture({ type: 'pressStart', id, event, info })
  }

  function emitHeroFramePress(id: HeroFrameHitId, event: PointerEvent, info: EventInfo) {
    emitHeroFrameGesture({ type: 'press', id, event, info })
    emitHeroFrameHit(id)
  }

  function emitHeroFramePressCancel(id: HeroFrameHitId, event: PointerEvent, info: EventInfo) {
    emitHeroFrameGesture({ type: 'pressCancel', id, event, info })
  }

  function emitHeroFramePanSessionStart(id: HeroFrameHitId, event: PointerEvent, info: PanInfo) {
    emitHeroFrameGesture({ type: 'panSessionStart', id, event, info })
  }

  function emitHeroFramePanStart(id: HeroFrameHitId, event: PointerEvent, info: PanInfo) {
    emitHeroFrameGesture({ type: 'panStart', id, event, info })
  }

  function emitHeroFramePan(id: HeroFrameHitId, event: PointerEvent, info: PanInfo) {
    emitHeroFrameGesture({ type: 'pan', id, event, info })
  }

  function emitHeroFramePanEnd(id: HeroFrameHitId, event: PointerEvent, info: PanInfo) {
    emitHeroFrameGesture({ type: 'panEnd', id, event, info })
  }

  function emitHeroFrameDragStart(id: HeroFrameHitId, event: PointerEvent, info: PanInfo) {
    emitHeroFrameGesture({ type: 'dragStart', id, event, info })
  }

  function emitHeroFrameDrag(id: HeroFrameHitId, event: PointerEvent, info: PanInfo) {
    emitHeroFrameGesture({ type: 'drag', id, event, info })
  }

  function emitHeroFrameDragEnd(id: HeroFrameHitId, event: PointerEvent, info: PanInfo) {
    emitHeroFrameGesture({ type: 'dragEnd', id, event, info })
  }

  function emitHeroFrameDirectionLock(id: HeroFrameHitId, axis: 'x' | 'y') {
    emitHeroFrameGesture({ type: 'directionLock', id, axis })
  }

  function emitHeroFrameDragTransitionEnd(id: HeroFrameHitId) {
    emitHeroFrameGesture({ type: 'dragTransitionEnd', id })
  }

  function emitHeroFrameViewportEnter(id: HeroFrameHitId, entry: IntersectionObserverEntry | null) {
    emitHeroFrameGesture({ type: 'viewportEnter', id, entry })
  }

  function emitHeroFrameViewportLeave(id: HeroFrameHitId, entry: IntersectionObserverEntry | null) {
    emitHeroFrameGesture({ type: 'viewportLeave', id, entry })
  }

  function emitHeroFrameFocus(id: HeroFrameHitId, event: FocusEvent) {
    emitHeroFrameGesture({ type: 'focus', id, event })
  }

  function emitHeroFrameBlur(id: HeroFrameHitId, event: FocusEvent) {
    emitHeroFrameGesture({ type: 'blur', id, event })
  }

  return {
    heroFrameHit,
    heroFrameHitSeq,
    emitHeroFrameHit,
    heroFrameGesture,
    heroFrameGestureSeq,
    emitHeroFrameGesture,
    emitHeroFrameHoverStart,
    emitHeroFrameHoverEnd,
    emitHeroFramePressStart,
    emitHeroFramePress,
    emitHeroFramePressCancel,
    emitHeroFramePanSessionStart,
    emitHeroFramePanStart,
    emitHeroFramePan,
    emitHeroFramePanEnd,
    emitHeroFrameDragStart,
    emitHeroFrameDrag,
    emitHeroFrameDragEnd,
    emitHeroFrameDirectionLock,
    emitHeroFrameDragTransitionEnd,
    emitHeroFrameViewportEnter,
    emitHeroFrameViewportLeave,
    emitHeroFrameFocus,
    emitHeroFrameBlur,
  }
}
