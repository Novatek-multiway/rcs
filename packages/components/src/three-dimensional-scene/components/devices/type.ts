export interface DeviceItem {
  id: number
  name: string
  no: string
  width?: number
  height?: number
  depth?: number
  x: number
  y: number
  z: number
  deviceTypeName: string
  hasLocations: boolean
  rotationY: number
}

export interface IDevicesProps {
  deviceList?: DeviceItem[]
}
