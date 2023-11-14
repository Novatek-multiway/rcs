import { request } from '../../request'
import { IResponse } from '../../type'

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const getChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Carrier/GetChassisInfos', {
    method: 'GET',
    params: data
  })
}

export const delChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Carrier/DelChassisInfo', {
    method: 'POST',
    params: data
  })
}

export const CreateChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Carrier/CreateChassis', {
    method: 'POST',
    data
  })
}

export const UpdateChassisInfos = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Carrier/ModifyChassis', {
    method: 'POST',
    data
  })
}

// 待命点配置
export const postCarrierInfoPageList = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Carrier/GetCarrierInfoPageList', {
    method: 'POST',
    data
  })
}

export const updateCarrier = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Carrier/UpdateCarrierHomeOption', {
    method: 'POST',
    data
  })
}

export const getControlStates = (ID = 0) => {
  return request<IResponse<any>>('/Carrier/GetControlStates', {
    method: 'GET',
    params: {
      ID
    }
  })
}
