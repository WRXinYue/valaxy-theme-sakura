import type { HeroFrameGestureEvent, HeroFrameGestureType, HeroFrameHit, HeroFrameHitId } from '../../stores/heroFrame'
import { gestureMonitor } from '../debug'

type AnyListener = (...args: any[]) => void

class ChannelEmitter {
  private listeners = new Map<string, Set<AnyListener>>()

  on(event: string, listener: AnyListener) {
    const set = this.listeners.get(event) ?? new Set<AnyListener>()
    set.add(listener)
    this.listeners.set(event, set)
    return () => this.off(event, listener)
  }

  once(event: string, listener: AnyListener) {
    const off = this.on(event, (...args: any[]) => {
      off()
      listener(...args)
    })
    return off
  }

  off(event: string, listener: AnyListener) {
    const set = this.listeners.get(event)
    if (!set)
      return
    set.delete(listener)
    if (set.size === 0)
      this.listeners.delete(event)
  }

  emit(event: string, ...args: any[]) {
    const set = this.listeners.get(event)
    if (!set || set.size === 0)
      return
    for (const listener of Array.from(set))
      listener(...args)
  }

  clear(event?: string) {
    if (!event) {
      this.listeners.clear()
      return
    }
    this.listeners.delete(event)
  }
}

export class GestureEventBus {
  private static instance: GestureEventBus | undefined
  private emitters = new Map<string, ChannelEmitter>()

  static getInstance() {
    if (!this.instance)
      this.instance = new GestureEventBus()
    return this.instance
  }

  getChannel(channelId: string): ChannelEmitter {
    const existing = this.emitters.get(channelId)
    if (existing)
      return existing
    const created = new ChannelEmitter()
    this.emitters.set(channelId, created)
    return created
  }

  emitHeroFrameHit(hit: HeroFrameHit) {
    const channel = this.getChannel('hero-frame')
    channel.emit('hit', hit)
    channel.emit(hit.id, hit)
    gestureMonitor.log(`hit:${hit.id}`, 'hero-frame', hit)
  }

  emitHeroFrameGesture(gesture: HeroFrameGestureEvent) {
    const channel = this.getChannel('hero-frame')
    channel.emit('gesture', gesture)
    channel.emit(gesture.type, gesture)
    channel.emit(`${gesture.id}:${gesture.type}`, gesture)
    gestureMonitor.log(`${gesture.id}:${gesture.type}`, 'hero-frame', gesture)
  }
}

export type HeroFrameChannelEventName
  = | 'hit'
    | HeroFrameHitId
    | 'gesture'
    | HeroFrameGestureType
    | `${HeroFrameHitId}:${HeroFrameGestureType}`
