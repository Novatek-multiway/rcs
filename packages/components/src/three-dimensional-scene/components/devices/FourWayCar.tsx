import { animated, useSpring } from '@react-spring/three'
import * as THREE from 'three'

import { Locations } from '../warehouse/locations'
import DeviceItem from './DeviceItem'

export interface IFourWayCar {
  id: number
  hasLocations?: boolean
  position: THREE.Vector3
  width?: number
  height?: number
  depth?: number
  rotationY?: number
  onClick?: (id: number) => void
}

function FourWayCar(props: IFourWayCar) {
  const {
    id,
    hasLocations = true,
    position = [0, 0, 0],
    width = 1.27,
    height = 0.14,
    depth = 0.98,
    rotationY,
    onClick
  } = props

  const [groupProps] = useSpring(
    () => ({
      position,
      rotationY
    }),
    [position, rotationY]
  )
  return (
    <animated.group position={groupProps.position as unknown as THREE.Vector3} rotation-y={groupProps.rotationY}>
      {hasLocations && (
        <Locations locations={[{ id: '1', x: 0, y: 0.65, z: -0.1, width: 1, height: 1, depth: 1, asGoods: true }]} />
      )}
      <DeviceItem modelPaths={['/model/car/SXC-JXB.FBX']} size={{ width, height, depth }} id={id} onClick={onClick} />
    </animated.group>
  )
}

export default FourWayCar
