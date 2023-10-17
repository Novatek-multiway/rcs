import { TTexturePathMap } from '../../../hooks/useAutomaticTextures'
import { IThreeDimensionalObjectCommonProps } from '../../../type'

export interface ILocationsItemProps extends IThreeDimensionalObjectCommonProps {
  isFull?: boolean
  asGoods?: boolean
}

export interface ILocationsProps {
  locations: ILocationsItemProps[]
  locationsTexturePathMap?: TTexturePathMap
}
