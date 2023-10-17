import { IThreeDimensionalObjectCommonProps } from '../../../type'

export interface IShelvesProps extends IThreeDimensionalObjectCommonProps {
  column: number // 列
  row: number // 行
  layer: number // 层
}
