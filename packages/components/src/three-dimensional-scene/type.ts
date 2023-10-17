import { IDevicesProps } from './components/devices/type'
import { ILocationsItemProps } from './components/warehouse/locations/type'
import { IWarehouseProps } from './components/warehouse/type'

export interface IThreeDimensionalSceneProps {
  warehouseProps: IWarehouseProps
  devicesProps: IDevicesProps
  onLocationItemClick?: (locationItemData: ILocationsItemProps) => void
  onDeviceItemClick?: (deviceItemId: number) => void
}

export interface IThreeDimensionalSceneRef {
  clearSelectedLocationItem: () => void
  clearSelectedDeviceItem: () => void
}

// 三维对象公共属性
export interface IThreeDimensionalObjectCommonProps {
  id: string
  x: number
  y: number
  z: number
  width: number
  height: number
  depth: number
  name?: string
}

// 设备模型的类型
export enum ModelType {
  ForkTruck = 'ForkTruck',
  FourWay = 'FourWay',
  MxwCar = 'MxwCar'
}
