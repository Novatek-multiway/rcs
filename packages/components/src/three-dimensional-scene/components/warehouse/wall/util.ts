export interface IWallArgsAndPosition {
  position: [x: number, y: number, z: number]
  args: [width: number, height: number, depth: number]
}

/**
 * @description: 获取墙面的位置和尺寸
 * @param
 * @return {*}
 */
export const getWallArgsAndPosition = (
  groundSize: { width: number; height: number },
  wallSize = { wallDepth: 0.5, wallHeight: 10 },
  origin = { x: 0, y: 0, z: 0 }
) => {
  const { width, height } = groundSize
  const { wallDepth, wallHeight } = wallSize
  const { x, y, z } = origin
  const halfGroundWidth = width / 2
  const halfGroundHeight = height / 2
  const halfWallHeight = wallHeight / 2

  const left: IWallArgsAndPosition = {
    position: [x - halfGroundWidth, y + halfWallHeight, 0],
    args: [wallDepth, wallHeight, height + wallDepth]
  }
  const right: IWallArgsAndPosition = {
    position: [x + halfGroundWidth, y + halfWallHeight, 0],
    args: [wallDepth, wallHeight, height + wallDepth]
  }
  const top: IWallArgsAndPosition = {
    position: [x, y + halfWallHeight, z - halfGroundHeight],
    args: [width + wallDepth, wallHeight, wallDepth]
  }
  const bottom: IWallArgsAndPosition = {
    position: [x, y + halfWallHeight, z + halfGroundHeight],
    args: [width + wallDepth, wallHeight, wallDepth]
  }

  return [left, right, top, bottom]
}
