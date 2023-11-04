import { request } from '../../request'
import { IResponse } from '../../type'
import { ICarrierReportParams } from './type'

/**
 * @description: 获取所有在线车辆信息
 * @return {*}
 */
export const getOnLineCarriers = () =>
  request<IResponse<any>>('/Report/GetOnLineCarriers', {
    method: 'GET'
  })

/**
 * @description: 获取车辆时间统计
 * @return {*}
 */
export const getAgvTimeCount = () =>
  request<IResponse<any>>('/Report/GetAgvTimeCount', {
    method: 'POST'
  })

/**
 * @description: 获取稼动率统计
 * @return {*}
 */
export const getThroughReport = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetAgvThroughReport', {
    method: 'POST',
    data
  })

/**
 * @description: 获取车辆任务统计
 * @return {*}
 */
export const getTaskReport = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetEquipmentTaskReport', {
    method: 'POST',
    data
  })
