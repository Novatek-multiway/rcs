/**
 * Request
 *
 * LayoutVO
 */
export interface Layout {
  Areas?: DTSLayoutsAreaVO[] | null
  Locations?: DTSLayoutsLocationVO[] | null
  Shelves?: DTSLayoutsShelfVO[] | null
  Tunnels?: DTSLayoutsTunnelVO[] | null
  Warehouse?: DTSLayoutsWarehouseVO
}

/**
 * DTS.Layouts.AreaVO
 */
export interface DTSLayoutsAreaVO {
  Color?: null | string
  Height: number
  Id: string
  Length: number
  Name?: null | string
  Width: number
  X: number
  Y: number
  Z: number
}

/**
 * DTS.Layouts.LocationVO
 */
export interface DTSLayoutsLocationVO {
  Code?: null | string
  Color?: null | string
  CustomCode?: null | string
  Height: number
  Id: string
  IsAlarm?: boolean
  IsFull: boolean
  Length: number
  LocationStatus?: number
  Type?: number
  Width: number
  X: number
  Y: number
  Z: number
}

/**
 * DTS.Layouts.ShelfVO
 */
export interface DTSLayoutsShelfVO {
  Code?: null | string
  Color?: null | string
  Column: number
  Height: number
  Id: string
  Layer: number
  Length: number
  Name?: null | string
  Row: number
  Type?: number
  Width: number
  X: number
  Y: number
  Z: number
}

/**
 * DTS.Layouts.TunnelVO
 */
export interface DTSLayoutsTunnelVO {
  Code?: null | string
  Color?: null | string
  Height: number
  Id: string
  Length: number
  Name?: null | string
  Width: number
  X: number
  Y: number
  Z: number
}

/**
 * DTS.Layouts.WarehouseVO
 */
export interface DTSLayoutsWarehouseVO {
  Height: number
  Length: number
  Width: number
  X: number
  Y: number
  Z: number
}

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

export interface IKeyValue {
  Key: string
  Value: string
}
