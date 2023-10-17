import { Canvas } from '@react-three/fiber'
import { forwardRef, memo, useImperativeHandle } from 'react'

import { defaultCameraPosition } from './common'
import BasicElements from './components/basicElements/BasicElements'
import { Devices } from './components/devices'
import { ILocationsItemProps } from './components/warehouse/locations/type'
import Warehouse from './components/warehouse/Warehouse'
import { ThreeDimensionalSceneContext } from './context/threeDimensionalSceneContext'
import { IThreeDimensionalSceneProps, IThreeDimensionalSceneRef } from './type'
import { EVENT_BUS_TYPE, EventBus, useSubscription } from './utils/event-bus'

/**
 * 三维场景
 */
const eventEmitter = new EventBus()
const ThreeDimensionalScene = forwardRef<IThreeDimensionalSceneRef, IThreeDimensionalSceneProps>((props, ref) => {
  const { warehouseProps, devicesProps, onLocationItemClick, onDeviceItemClick } = props

  useSubscription<ILocationsItemProps>(eventEmitter, 'OPEN_LOCATION_DETAIL_PANEL', (val) => {
    onLocationItemClick?.(val)
  })

  useSubscription<number>(eventEmitter, 'OPEN_DEVICE_DETAIL_PANEL', (val) => {
    onDeviceItemClick?.(val)
  })

  // 清除选中的库位
  const clearSelectedLocationItem = () => {
    eventEmitter.emit(EVENT_BUS_TYPE.CLOSE_LOCATION_DETAIL_PANEL)
  }
  // 清除选中的设备
  const clearSelectedDeviceItem = () => {
    eventEmitter.emit(EVENT_BUS_TYPE.CLOSE_DEVICE_DETAIL_PANEL)
  }

  useImperativeHandle(ref, () => ({
    clearSelectedLocationItem,
    clearSelectedDeviceItem
  }))

  return (
    <ThreeDimensionalSceneContext.Provider value={{ eventEmitter }}>
      <Canvas
        dpr={[1, 2]}
        shadows={'soft'}
        camera={{ position: defaultCameraPosition, fov: 25, far: 2000 }}
        gl={{ logarithmicDepthBuffer: true, antialias: true }}
      >
        <color attach="background" args={['#17171b']} />
        <BasicElements />
        <Warehouse {...warehouseProps} />
        <Devices {...devicesProps} />
      </Canvas>
    </ThreeDimensionalSceneContext.Provider>
  )
})

export default memo(ThreeDimensionalScene)
