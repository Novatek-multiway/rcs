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
 * @description: 获取监控地图全部信息
 * @return {*}
 */
export const createTrafficBlock = (data: ITrafficBlock) =>
  request<IResponse<any>>('/Traffic/CreateTrafficBlock', {
    method: 'POST'
  })