/**
 * 后端返回数据和三维场景的映射关系
 * X --> x
 * Y --> z
 * Z --> y
 * Width --> width
 * Height --> depth
 * Length --> height
 */
const Object3DPropsKeyMap = {
  x: 'X',
  y: 'Z',
  z: 'Y',
  width: 'Width',
  height: 'Length',
  depth: 'Height'
}

/**
 * @description: 获取3D对象特定属性值
 * @param {Record} data
 * @param {*} any
 * @return {*}
 */
export const getObject3DPropsValue = (data: Record<string, any>) => (key: keyof typeof Object3DPropsKeyMap) =>
  data[Object3DPropsKeyMap[key]]

export const ratio = 1000 // 三维中一个单元代表1m, 传的数据是mm
export const unitTransform = (u: number) => u / ratio

/**
 * @description: 坐标和尺寸单位转换
 * @return {*}
 */
export const positionAndSizeUnitTransform = (data: {
  X: number
  Y: number
  Z: number
  Width: number
  Height: number
  Length: number
}) => ({
  // 将后端给的左上角的坐标转换到中心点
  x: unitTransform(getObject3DPropsValue(data)('x') + getObject3DPropsValue(data)('width') / 2),
  y: unitTransform(getObject3DPropsValue(data)('y') + getObject3DPropsValue(data)('height') / 2),
  z: unitTransform(-getObject3DPropsValue(data)('z') + getObject3DPropsValue(data)('depth') / 2),
  width: unitTransform(getObject3DPropsValue(data)('width')),
  height: unitTransform(getObject3DPropsValue(data)('height')),
  depth: unitTransform(getObject3DPropsValue(data)('depth'))
})
