import { request } from '../../request'
import { IAlarmResponse } from './type.d'

export interface AlarmRequest {
  /**
   * 过滤关键词
   */
  Filter?: string
  /**
   * 等级
   */
  Level?: string
  MaxResultCount?: number
  SkipCount?: number
  Sorting?: string
  /**
   * 类型
   */
  Type?: string
}

export const getAlarmList = (data: AlarmRequest) => {
  return request<IAlarmResponse>('/api/dts/alarm', {
    method: 'GET',
    params: data
  })
}

// export const getLocation = (data: ILocation) => {
//   return request<IStatisticsLocation>('/api/dts/statistics/location-statistics', {
//     method: 'GET',
//     params: data
//   })
// }

export * from './type.d'
