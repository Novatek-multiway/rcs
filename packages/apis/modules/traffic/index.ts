import { request } from '../../request'
import { IResponse } from '../../type'
import { ITrafficBlock } from './type'

export * from './type'

/**
 * @description: 获取监控地图全部信息
 * @return {*}
 */
export const getInitStates = () =>
  request<IResponse<any>>('/Traffic/GetInitStates', {
    method: 'POST'
  })

/**
 * @description: 创建车辆区块
 * @return {*}
 */
export const createTrafficBlock = (data: ITrafficBlock) =>
  request<IResponse<any>>('/Traffic/CreateTrafficBlock', {
    method: 'POST',
    data
  })

/**
 * @description: 获取车辆区块信息
 * @return {*}
 */
export const getTrafficBlock = () =>
  request<IResponse<any>>('/Traffic/GetTrafficBlocks', {
    method: 'GET'
  })

/**
 * @description: 删除车辆区块信息
 * @return {*}
 */
export const delTrafficBlock = (id: number) =>
  request<IResponse<any>>('/Traffic/DelTrafficBlock', {
    method: 'POST',
    data: {
      id
    }
  })
