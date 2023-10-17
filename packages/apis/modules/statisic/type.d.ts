/**
 * DTS.Statictics.DTOs.InventoryStatisticDto
 */
export interface IStatictics {
  /**
   * 统计数量
   */
  Date?: null | string
  /**
   * 入库数量
   */
  InStockCount?: number
  /**
   * 出库数量
   */
  OutStockCount?: number
}

export interface ILocation {
  /**
   * 占比
   */
  Proportion?: number
  /**
   * 库位类型
   */
  TypeName?: null | string
  /**
   *  库位数量
   */

  Count?: number
}

export interface ICapacityData {
  /**
   * 区域名称
   */
  AreaName?: null | string
  /**
   * 日期
   */
  Date?: null | string
  /**
   * 空货位数量
   */
  EmptyContainerCount?: number
  /**
   * 空货位数量/库位总数比例
   */
  EmptyContainerProportion?: number
  /**
   * 空货位数量
   */
  EmptyCount?: number
  /**
   * 空货位数量/库位总数比例
   */
  EmptyProportion?: number
  /**
   * 满托货位数量
   */
  FullContainerCount?: number
  /**
   * 满托货位数量/库位总数比例
   */
  FullContainerProportion?: number
  /**
   * 库位总数
   */
  TotalCount?: number
}
export interface IStatisticsResponse extends IResponse<IStatictics[]> {}
export interface IStatisticsLocation extends IResponse<ILocation[]> {}
export interface IStatisticsCapacity extends IResponse<ICapacityData[]> {}
