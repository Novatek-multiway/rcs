import { request } from '../../request'
import { IResponse } from '../../type'

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const getStationInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/GetStationInfoPageList', {
    method: 'POST',
    data
  })
}

export const delStationInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/DelStationInfo', {
    method: 'POST',
    params: data
  })
}

export const CreateStationInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/CreateStation', {
    method: 'POST',
    data
  })
}

export const UpdateStationInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Map/ModifyStation', {
    method: 'POST',
    data
  })
}

export const getVertexs = () => {
  return request<IResponse<any>>('/Map/GetVertexs', {
    method: 'GET'
  })
}

export const GetCarrierOptions = (data = { ID: 0 }) => {
  return request<IResponse<any>>('/Carrier/GetCarrierOptions', {
    method: 'POST',
    data
  })
}

export const GetChassisList = () => {
  return request<IResponse<any>>('/Carrier/GetChassisList', {
    method: 'GET'
  })
}

export const getAreaInfos = () => {
  return request<IResponse<any>>('/Map/GetAreaInfos', {
    method: 'GET'
  })
}

export const getStationInfoById = (params: Record<string, any>) => {
  return request<IResponse<any>>('/Map/GetStationInfo', {
    method: 'GET',
    params
  })
}
