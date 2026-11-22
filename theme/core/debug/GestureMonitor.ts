export interface GestureLogEntry {
  id: string
  source: string
  gesture: string
  timestamp: number
  metadata?: unknown
  stackTrace?: string
}

export class GestureMonitor {
  private logs: GestureLogEntry[] = []
  private subscribers = new Set<(log: GestureLogEntry) => void>()
  private maxLogs = 500

  setMaxLogs(max: number) {
    this.maxLogs = Math.max(0, max)
    if (this.logs.length > this.maxLogs)
      this.logs.splice(0, this.logs.length - this.maxLogs)
  }

  log(gesture: string, source: string, metadata?: unknown) {
    const timestamp = Date.now()
    const id = `gesture_${timestamp}_${Math.random().toString(36).slice(2, 11)}`
    const stackTrace = import.meta.env.DEV ? new Error('GestureMonitor').stack : undefined

    const logEntry: GestureLogEntry = {
      id,
      source,
      gesture,
      timestamp,
      metadata,
      stackTrace,
    }

    if (this.maxLogs > 0) {
      this.logs.push(logEntry)
      if (this.logs.length > this.maxLogs)
        this.logs.splice(0, this.logs.length - this.maxLogs)
    }

    for (const cb of this.subscribers)
      cb(logEntry)

    return logEntry
  }

  getLogs() {
    return this.logs.slice()
  }

  clearLogs() {
    this.logs = []
  }

  getLogsByGesture(gesture: string) {
    return this.logs.filter(log => log.gesture === gesture)
  }

  getSourcesByGesture(gesture: string): string[] {
    return Array.from(new Set(
      this.logs
        .filter(log => log.gesture === gesture)
        .map(log => log.source),
    ))
  }

  subscribe(callback: (log: GestureLogEntry) => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }
}

export const gestureMonitor = new GestureMonitor()

export function trackGesture(source: string, gesture: string, metadata?: unknown) {
  return gestureMonitor.log(gesture, source, metadata)
}
