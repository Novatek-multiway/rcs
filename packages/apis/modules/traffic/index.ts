import { request } from '../../request'
import { IResponse } from '../../type'

/**
 * @description: 获取监控地图全部信息
 * @return {*}
 */
export const getInitStates = () =>
  request<IResponse<any>>('/Traffic/GetInitStates', {
    method: 'POST'
  })
