import { IShelvesProps } from './type'

export const getShelfPositionAndSizeList = (
  shelvesInfo: Pick<IShelvesProps, 'width' | 'height' | 'depth' | 'layer' | 'row' | 'column' | 'x' | 'y' | 'z'>
) => {
  const list: (Pick<IShelvesProps, 'width' | 'height' | 'depth' | 'x' | 'y' | 'z'> & { isFirstLayer: boolean })[] = []
  const { width, height, depth, column, row, layer, x, y, z } = shelvesInfo
  // const shelfCount = column * row * layer

  const shelfSize = {
    width: width / column,
    height: height / layer,
    depth: depth / row
  }
  const shelfMinPosition = {
    x: x - width / 2,
    y: y - height / 2,
    z: z - depth / 2
  }
  // 计算所有列的货架
  for (let c = 0; c < column; c++) {
    // 计算所有行的货架
    for (let r = 0; r < row; r++) {
      // 计算所有层的货架

      for (let l = 0; l < layer; l++) {
        const shelfPosition = {
          x: shelfMinPosition.x + c * shelfSize.width + shelfSize.width / 2,
          y: shelfMinPosition.y + l * shelfSize.height + shelfSize.height / 2,
          z: shelfMinPosition.z + r * shelfSize.depth + shelfSize.depth / 2,
          isFirstLayer: l === 0
        }

        list.push({ ...shelfPosition, ...shelfSize })
      }
    }
  }

  return list
}
