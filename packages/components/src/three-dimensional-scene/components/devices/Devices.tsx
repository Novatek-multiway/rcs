import { Bounds, useBounds } from '@react-three/drei'
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing'
import type { FC, PropsWithChildren } from 'react'
import { memo, useContext } from 'react'

import { ModelType } from '../../../..'
import { ThreeDimensionalSceneContext } from '../../../three-dimensional-scene/context/threeDimensionalSceneContext'
import { defaultCameraPosition } from '../../common'
import { useSubscription } from '../../utils/event-bus'
import { modelNameMap, modelRenderMap } from './constants'
import { IDevicesProps } from './type'

const getModelComponent = (modelName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modelType = Object.entries(modelNameMap).find(([_, v]) => modelName === v)?.[0] as ModelType

  return modelRenderMap[modelType]
}

const SelectToZoom: FC<PropsWithChildren> = ({ children }) => {
  const api = useBounds()
  const { eventEmitter } = useContext(ThreeDimensionalSceneContext)
  useSubscription(eventEmitter, 'CLOSE_DEVICE_DETAIL_PANEL', () => {
    api.to({ position: defaultCameraPosition, target: [0, 0, 0] })
  })
  return (
    <group
      onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())}
      // onPointerMissed={(e) => e.button === 0 && api.to({ position: defaultCameraPosition, target: [0, 0, 0] })}
    >
      {children}
    </group>
  )
}

const Devices: FC<IDevicesProps> = (props) => {
  const { deviceList = [] } = props
  const { eventEmitter } = useContext(ThreeDimensionalSceneContext)
  const onDeviceItemClick = (id: number) => {
    eventEmitter.emit('OPEN_DEVICE_DETAIL_PANEL', id)
  }
  return (
    <Selection>
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline visibleEdgeColor={0x00d1d1} edgeStrength={10} width={1000} />
        <Bounds margin={4}>
          <group>
            {deviceList?.map((device) => (
              <SelectToZoom key={device.id}>
                {getModelComponent(device.deviceTypeName)({
                  ...device,
                  position: [device.x, device.y, device.z],
                  onClick: onDeviceItemClick
                })}
              </SelectToZoom>
            ))}
          </group>
        </Bounds>
      </EffectComposer>
    </Selection>
  )
}

export default memo(Devices)
