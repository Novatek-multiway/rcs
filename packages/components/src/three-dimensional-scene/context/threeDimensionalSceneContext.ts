import { createContext } from 'react'

import { EventBus, TEventBusInstance } from '../utils/event-bus'

export type TThreeDimensionalSceneContext = {
  eventEmitter: TEventBusInstance
}

export const ThreeDimensionalSceneContext = createContext<TThreeDimensionalSceneContext>({
  eventEmitter: new EventBus()
})
