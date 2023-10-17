import { request } from '../../request'
import { IRequestDate } from '../common.d'
import { IStatisticsCapacity, IStatisticsLocation, IStatisticsResponse } from './type.d'

interface IData extends IRequestDate {
  /**
   * 日期类型 Day：日、Month：月
   */
  DateType?: string
}
interface ILocation {
  AreaId?: string
}

interface ICapacity extends IRequestDate {
  /**
   * 区域Id（非必填，当为空时查询所有区域数据）
   */
  AreaId?: number
}
export const getStatistics = (data: IData) => {
  return request<IStatisticsResponse>('/api/dts/statistics/inventory-statistics', {
    method: 'GET',
    params: data
  })
}
export const getLocation = (data: ILocation) => {
  return request<IStatisticsLocation>('/api/dts/statistics/location-statistics', {
    method: 'GET',
    params: data
  })
}

export const getCapacity = (data: ICapacity) => {
  return request<IStatisticsCapacity>('/api/dts/statistics/capacity-statistics', {
    method: 'GET',
    params: data
  })
}
