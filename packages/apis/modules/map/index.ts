import { request } from '../../request'
import { IResponse } from '../../type'

export const GetMapOptionPageList = (data = { id: 0 }) => {
  return request<IResponse<any>>('/Map/GetMapOptionPageList', {
    method: 'POST',
    data
  })
}

export const DeleteRouteFileInfo = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/DeleteRouteFileInfo', {
    method: 'POST',
    data
  })
}

export const ChangeActive = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/ChangeActive', {
    method: 'POST',
    data
  })
}

export const GetRouteFileInfo = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/GetRouteFileInfo', {
    method: 'POST',
    data
  })
}

export const WriteRouteFileInfo = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/WriteRouteFileInfo', {
    method: 'POST',
    data
  })
}

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
}) => {
  // request<IResponse<any>>('/Map/UpdateFunction', {
  //   method: 'POST',
  //   data
  // })
  return request<IResponse<any>>('/Map/WriteRouteFileInfo', {
    method: 'POST',
    data
  })
}

export const UpdateRouteFileInfo = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/UpdateRouteFileInfo', {
    method: 'POST',
    data
  })
}

export const GetSvgMapNameList = () => {
  return request<IResponse<any>>('/Map/GetSvgMapNameList', {
    method: 'get'
  })
}

export const GetDxfMapNameList = () =>
  request<IResponse<any>>('/Map/GetDxfMapNameList', {
    method: 'get'
  })

export const UpLoadDxfMap = (data: Record<string, any>) =>
  request<IResponse<any>>('/Map/UpLoadDxfMap', {
    method: 'POST',
    data
  })

/**
 * @description: 获取路径线信息
 * @param {Record} data
 * @param {*} any
 * @return {*}
 */
export const getMapEdges = (data?: Record<string, any>) =>
  request<IResponse<any>>('/Map/GetEdges', {
    method: 'GET',
    data
  })
