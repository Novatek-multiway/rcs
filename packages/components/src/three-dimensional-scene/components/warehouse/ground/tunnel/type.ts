import { IThreeDimensionalObjectCommonProps } from '../../../../type'

export interface ITunnelProps extends Omit<IThreeDimensionalObjectCommonProps, 'height'> {
  height?: number
}
