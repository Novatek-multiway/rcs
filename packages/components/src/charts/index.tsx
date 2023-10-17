import ReactCharts, { EChartsReactProps } from 'echarts-for-react'
import { FC, memo } from 'react'

interface TBarChartProps extends EChartsReactProps {}
const BaseCharts: FC<TBarChartProps> = (props) => {
  const { option, ...rect } = props
  return <ReactCharts option={option} {...rect} />
}
export default memo(BaseCharts)
