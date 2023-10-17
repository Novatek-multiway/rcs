import * as THREE from 'three'

// 将 position 转换为 Vector3 对象
export const positionVector = (position: number[]) => {
  return Array.isArray(position) ? new THREE.Vector3(...position) : position
}
/**
+ * 计算THREE.Object3D模型的边界框大小。
+ *
+ * @param {THREE.Object3D} model - 要计算边界框大小的模型。
+ * @return {THREE.Vector3} 边界框的大小，以THREE.Vector3对象的形式返回。
+ */
export const getBoundingBoxSize = (model: THREE.Object3D) => {
  const boundingBox = new THREE.Box3().setFromObject(model)
  const size = new THREE.Vector3()
  boundingBox.getSize(size)
  return size
}

/**
 * @description: 获取多个模型集合最大的边界框大小
 * @param {THREE} models 模型集合
 * @return {THREE.Vector3} 最大的边界框大小
 */
export const getModelsBoundingBoxSize = (models: THREE.Object3D[]) => {
  const allBoundingSize = models.map((model) => getBoundingBoxSize(model))
  const maxX = Math.max(...allBoundingSize.map((s) => s.x))
  const maxY = Math.max(...allBoundingSize.map((s) => s.y))
  const maxZ = Math.max(...allBoundingSize.map((s) => s.z))

  return {
    x: maxX,
    y: maxY,
    z: maxZ
  }
}

/**
 * @description: 获取group当前boundingBox变成targetSize时，需要设置的scaling
 * @return {*}
 */
export const getScalingOfModelGroupTargetSize = (
  models: THREE.Object3D[],
  targetSize: { width: number; height: number; depth: number }
) => {
  let group: THREE.Group | null = new THREE.Group()
  models.forEach((model) => group!.add(model.clone()))
  const { x, y, z } = getBoundingBoxSize(group)
  const { width, height, depth } = targetSize

  group = null
  return new THREE.Vector3(width / x, height / y, depth / z)
}
