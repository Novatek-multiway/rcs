import { request } from '../../request'
import { IResponse } from '../../type'

/**
 * @description: 获取监控地图开关信息
 * @return {*}
 */
export const getMapFunction = () =>
  request<IResponse<any>>('/Map/GetFunction', {
    method: 'GET'
  })

/**
 * @description: 更新监控地图开关信息
 * @return {*}
 */
export const updateMapFunction = (data: {
  id: number
  functionName: string
  functionSort: number
  enabled: boolean
  showed: boolean
}) =>
  request<IResponse<any>>('/Map/UpdateFunction', {
    method: 'POST',
    data
  })
