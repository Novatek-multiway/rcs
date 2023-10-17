import { animated, useSpring } from '@react-spring/three'
import * as THREE from 'three'

import { Locations } from '../warehouse/locations'
import DeviceItem from './DeviceItem'

export interface IMxwCar {
  id: number
  hasLocations?: boolean // 是否有货
  position?: THREE.Vector3
  rotationY: number
  width?: number
  height?: number
  depth?: number
  onClick?: (id: number) => void
}
/**
 * 在 3D 场景中渲染汽车模型的组件。
 * - 测试文档
 * @param {IMxwCar} props - The props object for configuring the car.
 * @param {boolean} props.hasLocations - Determines whether the car has goods. Default is true.
 * @param {number[]} props.position - The position of the car in 3D space. Default is [35, 0, -5].
 * @param {number} props.rotationY- The rotation angle of the car. Default is 0.
 * @return {JSX.Element} - The rendered car component.
 */
function MxwCar(props: IMxwCar) {
  const {
    id,
    hasLocations = true,
    position = [35, 0, -5],
    rotationY = 0,
    width = 0.82,
    height = 1.99,
    depth = 1.6,
    onClick
  } = props

  // 将 position 转换为 Vector3 对象
  // const positionVector = Array.isArray(position) ? new THREE.Vector3(...position) : position

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
        <Locations locations={[{ id: '1', x: 0, y: 0.7, z: 0, width: 1, height: 1, depth: 1, asGoods: true }]} />
      )}
      <DeviceItem modelPaths={['/model/car/Mxw-1.FBX']} size={{ width, height, depth }} id={id} onClick={onClick} />
    </animated.group>
  )
}

export default MxwCar
