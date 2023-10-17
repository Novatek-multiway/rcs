import { IThreeDimensionalObjectCommonProps } from '../../../../type'

export interface IAreaProps extends Omit<IThreeDimensionalObjectCommonProps, 'height'> {
  height?: number
  areaMarkLineWidth?: number
}
