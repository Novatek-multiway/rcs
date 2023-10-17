import { memo, useLayoutEffect, useMemo, useRef } from 'react'
import type { ExtrudeGeometry } from 'three'
import * as THREE from 'three'

// 镂空几何体
const HollowCylinderGeometry = ({ innerRadius = 0.5, outerRadius = 1, radialSegments = 4, height = 1, ...props }) => {
  // 使用useRef函数，设置ref的值为null
  const ref = useRef<ExtrudeGeometry>(null)
  // 使用useMemo函数，计算arcShape和options
  const { arcShape, options } = useMemo(() => {
    // 创建arcShape
    const arcShape = new THREE.Shape()
    // 画出第一个圆
    arcShape.moveTo(outerRadius * 2, outerRadius)
    arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false)
    // 创建holePath
    const holePath = new THREE.Path()
    // 画出第二个圆
    holePath.moveTo(outerRadius + innerRadius, outerRadius)
    holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true)
    // 将holePath添加到arcShape中
    arcShape.holes.push(holePath)
    // 设置options
    const options = {
      depth: height,
      bevelEnabled: false,
      steps: 1,
      curveSegments: radialSegments / 2
    }
    // 返回arcShape和options
    return { arcShape, options }
  }, [])
  // 使用useLayoutEffect函数，设置ref的位置
  useLayoutEffect(() => {
    ref.current?.center()
    // ref.current?.rotateX(Math.PI * -0.5)
    // ref.current?.rotateZ(Math.PI / 4)
  }, [])
  // 返回extrudeGeometry
  return <extrudeGeometry ref={ref} args={[arcShape, options]} {...props} />
}

export default memo(HollowCylinderGeometry)
