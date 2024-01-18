import { useVoerkaI18n } from '@voerkai18n/react'

import circleBlue from '@/assets/vehicles/lights/circleBlue.png'
import circleRed from '@/assets/vehicles/lights/circleRed.png'
import circleWhite from '@/assets/vehicles/lights/circleWhite.png'
import circleYellow from '@/assets/vehicles/lights/circleYellow.png'
import { getAssetsRightPath } from '@/utils/path'

import { EMapSettingsKeys } from '../../../../constants'

export const useConstants = () => {
  const { t } = useVoerkaI18n()
  const Switches = [
    {
      key: EMapSettingsKeys.IS_LOCATION_VISIBLE,
      label: t('显示库位'),
      zhLabel: '显示库位'
    },
    {
      key: EMapSettingsKeys.IS_POINT_VISIBLE,
      label: t('显示点位'),
      zhLabel: '显示点位'
    },
    {
      key: EMapSettingsKeys.IS_DIRECTION_VISIBLE,
      label: t('显示方向'),
      zhLabel: '显示方向'
    },
    {
      key: EMapSettingsKeys.IS_VEHICLE_OUTLINE_VISIBLE,
      label: t('车辆轮廓'),
      zhLabel: '车辆轮廓'
    },
    {
      key: EMapSettingsKeys.IS_VEHICLE_IMAGE_VISIBLE,
      label: t('车辆图片'),
      zhLabel: '车辆图片'
    },
    {
      key: EMapSettingsKeys.IS_VEHICLE_BENCHMARK_VISIBLE,
      label: t('基准点'),
      zhLabel: '基准点'
    },
    {
      key: EMapSettingsKeys.IS_VEHICLE_ON_WORK_VISIBLE,
      label: t('工作车辆'),
      zhLabel: '工作车辆'
    },
    {
      key: EMapSettingsKeys.IS_VEHICLE_PLANNING_VISIBLE,
      label: t('规划路线'),
      zhLabel: '规划路线'
    },
    {
      key: EMapSettingsKeys.IS_FAULTY_VEHICLE_VISIBLE,
      label: t('故障车辆'),
      zhLabel: '故障车辆'
    },
    {
      key: EMapSettingsKeys.IS_VEHICLE_DETAIL_VISIBLE,
      label: t('车辆详情'),
      zhLabel: '车辆详情'
    },
    {
      key: EMapSettingsKeys.IS_VEHICLE_PLANNING_SINGLE_COLOR,
      label: t('单一颜色'),
      zhLabel: '单一颜色'
    },
    {
      key: EMapSettingsKeys.IS_DEV_MODE,
      label: t('开发模式'),
      zhLabel: '开发模式'
    },
    {
      key: EMapSettingsKeys.IS_STATION_VISIBLE,
      label: t('显示站点'),
      zhLabel: '显示站点'
    }
    // {
    //   key: '',
    //   label: '显示CAD'
    // }
  ]

  const Lights = [
    {
      label: t('正常'),
      image: getAssetsRightPath(circleBlue)
    },
    {
      label: t('手动'),
      image: getAssetsRightPath(circleWhite)
    },
    {
      label: t('交管'),
      image: getAssetsRightPath(circleYellow)
    },
    {
      label: t('异常'),
      image: getAssetsRightPath(circleRed)
    }
  ]

  return {
    Switches,
    Lights
  }
}
