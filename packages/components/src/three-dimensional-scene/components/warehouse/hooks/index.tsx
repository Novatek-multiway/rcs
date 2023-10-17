import { Edges } from '@react-three/drei'

import { IWallArgsAndPosition } from '../wall/util'

interface IUseGenericWall {
  generateMeshes: (
    wallArgsAndPositions: IWallArgsAndPosition[],
    textureMap: React.PropsWithChildren<any>,
    geometryRef?: React.MutableRefObject<any>
  ) => JSX.Element[]
}

const useGenericWall = (): IUseGenericWall => {
  const generateMeshes: IUseGenericWall['generateMeshes'] = (
    wallArgsAndPositions,
    textureMap,
    geometryRef
  ): JSX.Element[] => {
    return wallArgsAndPositions.map(({ args, position }, index) => (
      <mesh position={position} key={index} receiveShadow>
        <boxGeometry args={[...args, 4, 4, 4]} ref={geometryRef} />
        <meshStandardMaterial transparent opacity={0.1} color="#00d1d1" {...textureMap} />
        <Edges color="#00d1d1" />
      </mesh>
    ))
  }

  return { generateMeshes }
}

export default useGenericWall
