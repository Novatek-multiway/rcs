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
 * @description: 统计当前车辆执行任务的数量，工作时间，故障时间
 * @return {*}
 */
export const getTimeSum = () =>
  request<IResponse<any>>('/Report/GetTimeSum', {
    method: 'GET'
  })

/**
 * @description: 获取稼动率统计
 * @return {*}
 */
export const getThroughReport = () =>
  request<IResponse<any>>('/Report/GetAgvThroughs', {
    method: 'GET'
  })

/**
 * @description: 获取车辆状态
 * @return {*}
 */
export const getAgvStatus = () =>
  request<IResponse<any>>('/Report/GetAgvStatus', {
    method: 'GET'
  })

/**
 * @description: 获取车辆任务统计
 * @return {*}
 */
export const getTaskReport = () =>
  request<IResponse<any>>('/Report/GetJobSumByAgv', {
    method: 'GET'
  })
