import { IGroundProps } from './ground/type'
import { ILocationsProps } from './locations/type'
import { IShelvesProps } from './shelves/type'
import { ITracksProps } from './tracks/type'

export interface IWarehouseProps {
  x?: number
  y?: number
  z?: number
  groundProps?: IGroundProps
  shelvesList?: IShelvesProps[]
  locationsProps?: ILocationsProps
  tracksProps?: ITracksProps
}
