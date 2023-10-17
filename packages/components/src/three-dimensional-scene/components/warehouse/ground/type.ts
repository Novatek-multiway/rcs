import { TTexturePathMap } from '../../../hooks/useAutomaticTextures'
import { IAreaProps } from './area/type'
import { ITunnelProps } from './tunnel/type'

export interface IGroundProps {
  width: number
  depth: number
  x?: number
  y?: number
  z?: number
  groundTexturePathMap?: TTexturePathMap
  areas?: IAreaProps[]
  tunnels?: ITunnelProps[]
}
