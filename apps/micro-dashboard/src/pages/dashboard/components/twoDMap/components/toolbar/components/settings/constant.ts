import circleBlue from '@/assets/vehicles/lights/circleBlue.png'
import circleRed from '@/assets/vehicles/lights/circleRed.png'
import circleWhite from '@/assets/vehicles/lights/circleWhite.png'
import circleYellow from '@/assets/vehicles/lights/circleYellow.png'
import { getAssetsRightPath } from '@/utils/path'

export const Switches = [
  {
    key: '',
    label: '显示库位'
  },
  {
    key: '',
    label: '显示点位'
  },
  {
    key: '',
    label: '显示方向'
  },
  {
    key: '',
    label: '车辆轮廓'
  },
  {
    key: '',
    label: '车辆图片'
  },
  {
    key: '',
    label: '基准点'
  },
  {
    key: '',
    label: '工作车辆'
  },
  {
    key: '',
    label: '规划路线'
  },
  {
    key: '',
    label: '故障车辆'
  },
  {
    key: '',
    label: '车辆详情'
  },
  {
    key: '',
    label: '单一颜色'
  },
  {
    key: '',
    label: '开发模式'
  },
  {
    key: '',
    label: '显示站点'
  },
  {
    key: '',
    label: '显示CAD'
  }
]

export const Lights = [
  {
    label: '正常',
    image: getAssetsRightPath(circleBlue)
  },
  {
    label: '手动',
    image: getAssetsRightPath(circleWhite)
  },
  {
    label: '交管',
    image: getAssetsRightPath(circleYellow)
  },
  {
    label: '异常',
    image: getAssetsRightPath(circleRed)
  }
]
