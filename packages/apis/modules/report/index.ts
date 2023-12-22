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

/**
 * @description: 获取车辆电量统计
 * @return {*}
 */
export const getAgvCharge = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetAGVCharge', {
    method: 'POST',
    data
  })

/**
 * @description: 获取效率统计
 * @return {*}
 */
export const getAgvEfficiency = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetAGVEfficiency', {
    method: 'POST',
    data
  })

/**
 * @description: 车辆运行时间占比
 * @return {*}
 */
export const getAgvTimeRatio = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetAGVTimeRatio', {
    method: 'POST',
    data
  })

/**
 * @description: 稼动率统计
 * @return {*}
 */
export const getAgvThroughReport = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetAgvThroughReport', {
    method: 'POST',
    data
  })

/**
 * @description: 无故障时间统计
 * @return {*}
 */
export const getNoFaultReport = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetNoFaultReport', {
    method: 'POST',
    data
  })

/**
 * @description: 设备完成任务数
 * @return {*}
 */
export const getEquipmentTaskReport = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetEquipmentTaskReport', {
    method: 'POST',
    data
  })

/**
 * @description: 车辆运行公里数
 * @return {*}
 */
export const getAgvKilometers = (data: ICarrierReportParams) =>
  request<IResponse<any>>('/Report/GetAGVKilometers', {
    method: 'POST',
    data
  })
