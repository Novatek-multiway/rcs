/**
 * DTS.ModelTypes.DTOs.ModelTypeDto，设备类型
 */
export interface IDeviceType {
  /**
   * 素材地址
   */
  AssetPath?: string
  /**
   * 高度
   */
  Height: number
  /**
   * 长
   */
  Length: number
  /**
   * 类型名称
   */
  Name: string
  /**
   * 高
   */
  Width: number
}

/**
 * DTS.ModelTypes.DTOs.ModelTypeDto，创建设备类型的接口
 */
export interface ICreateDeviceType extends IDeviceType {}

export interface IDeviceTypeWithId extends IDeviceType {
  Id: number
}

/**
 * 设备类型响应
 */
export interface IDeviceTypeResponse {
  Items: DTSModelTypesDTOsModelTypeItemDto[]
}

/**
 * DTS.ModelTypes.DTOs.ModelTypeItemDto
 */
export interface DTSModelTypesDTOsModelTypeItemDto {
  /**
   * Id
   */
  Id: number
  /**
   * 模型数量
   */
  ModelCount: number
  /**
   * 类型名称
   */
  Name: string
}

export interface IDevice {
  /**
   * 名称
   */
  Name: string
  /**
   * 编号
   */
  No: string
  /**
   * 扩展属性
   */
  Properties?: { [key: string]: null } | null
  /**
   * 坐标X
   */
  X: number
  /**
   * 坐标Y
   */
  Y: number
  /**
   * 坐标Z
   */
  Z: number
  /**
   * 长
   */
  Length: number
  /**
   * 宽
   */
  Width: number
  /**
   * 高
   */
  Height: number
}

/**
 * DTS.Models.DTOs.ModelDto 创建设备
 */
export interface ICreateDevice extends IDevice {
  /**
   * 描述
   */
  Description: string
  /**
   * 设备类型Id
   */
  ModelTypeId: number
  /**
   * 编号
   */
  No: string
}

/**
 * DTS.Models.DTOs.ModelItemDto 设备列表
 */
export interface IDeviceItemResponse extends IDevice {
  /**
   * Id
   */
  Id: number
  /**
   * 设备状态
   */
  State: null | string
  /**
   * 设备类型名称
   */
  TypeName: string
  /**
   * 设备类型Id
   */
  ModelTypeId: number
}

/**
 * DTS.Models.DTOs.CreateOrUpdateModelInput，更新设备参数
 */
export interface IUpdateDevice extends IDevice {
  /**
   * 描述
   */
  Description: string
  /**
   * 设备类型Id
   */
  ModelTypeId: number
}

export interface IDeviceWithTypeName extends IDevice, IDeviceItemResponse {
  /**
   * 描述
   */
  Description: string
  /**
   * 设备类型名称
   */
  TypeName: string
  /**
   * 健康状态
   */
  Health: string
  /**
   * 设备类型id
   */
  TypeId: number
}
