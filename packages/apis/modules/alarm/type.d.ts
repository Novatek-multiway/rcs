export interface IResponse<T> {
  Success: boolean
  Result: T
  Message: string
}

export interface AlamarDTOsAlarmDto {
  Items?: DTSAlarmsDTOsAlarmDto[] | null
  TotalCount?: number
}

/**
 * DTS.Alarms.DTOs.AlarmDto
 */
export interface DTSAlarmsDTOsAlarmDto {
  /**
   * 区域名称
   */
  AreaName?: null | string
  /**
   * 内容
   */
  Content?: null | string
  /**
   * Id
   */
  Id?: number
  /**
   * 通知等级
   */
  Level?: null | string
  /**
   * 发生时间
   */
  OccurredTime?: Date
  /**
   * 类型
   */
  Type?: null | string
}

export interface IAlarmResponse extends IResponse<AlamarDTOsAlarmDto> {}
