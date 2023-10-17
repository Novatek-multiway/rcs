import { request } from '../../request'
import { IResponse } from '../../type'
import {
  ICreateDevice,
  ICreateDeviceType,
  IDeviceItemResponse,
  IDeviceType,
  IDeviceTypeResponse,
  IDeviceTypeWithId,
  IDeviceWithTypeName,
  IUpdateDevice
} from './type'

// 创建设备类型
export const createDeviceType = (data: ICreateDeviceType) =>
  request<IResponse<null>>('/api/dts/model-type', {
    method: 'POST',
    data
  })
// 获取设备类型列表
export const getDeviceTypeList = () =>
  request<IResponse<IDeviceTypeResponse>>('/api/dts/model-type/items', {
    method: 'GET'
  })
//根据id获取设备类型
export const getDeviceTypeById = (id: number) => request<IResponse<IDeviceTypeWithId>>(`/api/dts/model-type/${id}`)
// 删除设备类型
export const deleteDeviceType = (id: number) =>
  request<IResponse<null>>(`/api/dts/model-type/${id}`, { method: 'DELETE' })
//更新设备类型
export const updateDeviceType = (id: number, data: IDeviceType) =>
  request<IResponse<null>>(`/api/dts/model-type/${id}`, {
    method: 'PUT',
    data
  })

// 创建设备
export const createDevice = (data: ICreateDevice) =>
  request<IResponse<null>>('/api/dts/model', {
    method: 'POST',
    data
  })
// 获取设备列表
export const getDeviceList = () =>
  request<IResponse<IDeviceItemResponse[]>>('/api/dts/model/items', {
    method: 'GET'
  })
// 根据id获取设备
export const getDeviceById = (id: number) => request<IResponse<IDeviceWithTypeName>>(`/api/dts/model/${id}`)
// 删除设备
export const deleteDevice = (id: number) => request<IResponse<null>>(`/api/dts/model/${id}`, { method: 'DELETE' })
// 更新设备
export const updateDevice = (id: number, data: IUpdateDevice) =>
  request<IResponse<null>>(`/api/dts/model/${id}`, {
    method: 'PUT',
    data
  })

export * from './type.d'
