import { useEffect } from 'react'

// 事件总线实例类型
export type TEventBusInstance = InstanceType<typeof EventBus>

// 事件的枚举
export enum EVENT_BUS_TYPE {
  CLOSE_LOCATION_DETAIL_PANEL = 'CLOSE_LOCATION_DETAIL_PANEL',
  OPEN_LOCATION_DETAIL_PANEL = 'OPEN_LOCATION_DETAIL_PANEL',
  CLOSE_DEVICE_DETAIL_PANEL = 'CLOSE_DEVICE_DETAIL_PANEL',
  OPEN_DEVICE_DETAIL_PANEL = 'OPEN_DEVICE_DETAIL_PANEL'
}

export type TEventBusKey = keyof typeof EVENT_BUS_TYPE
type TEventBusCallback = (...args: any[]) => void

export class EventBus {
  private _events: Partial<Record<EVENT_BUS_TYPE, TEventBusCallback[]>> = {}

  on(event: TEventBusKey, fn: TEventBusCallback) {
    if (typeof fn !== 'function') {
      console.error('_EventsBus.on callback not function!')
      return
    }

    if (this._events[EVENT_BUS_TYPE[event]]) {
      this._events[EVENT_BUS_TYPE[event]]?.push(fn)
    } else {
      this._events[EVENT_BUS_TYPE[event]] = [fn]
    }

    return this
  }

  emit(event: TEventBusKey, ...args: any[]) {
    const cbs: TEventBusCallback[] | undefined = this._events[EVENT_BUS_TYPE[event]]
    if (cbs) {
      cbs.forEach((fn) => fn(...args))
    }

    return this
  }

  off(event: TEventBusKey | EVENT_BUS_TYPE[], fn: TEventBusCallback) {
    // clear all
    if (!arguments.length) {
      this._events = Object.create(null)
      return this
    }

    if (Array.isArray(event)) {
      for (let i = 0, len = event.length; i < len; i++) {
        this.off(event[i], fn)
      }

      return this
    }

    if (this._events[EVENT_BUS_TYPE[event]]) {
      const idx = this._events[EVENT_BUS_TYPE[event]]?.indexOf(fn)
      if (idx && idx !== -1) this._events[EVENT_BUS_TYPE[event]]?.splice(idx, 1)
    }

    return this
  }

  once(event: TEventBusKey, fn: TEventBusCallback) {
    const on = (...args: any[]) => {
      this.off(event, on)
      fn(...args)
    }

    this.on(event, on)
  }
}

export const useSubscription = <P = any>(
  eventBusInstance: TEventBusInstance,
  key: TEventBusKey,
  callback: (val: P) => void
) => {
  if (!eventBusInstance) return
  useEffect(() => {
    eventBusInstance.on(key, callback)

    return () => {
      eventBusInstance.off(key, callback)
    }
  }, [callback])
}
