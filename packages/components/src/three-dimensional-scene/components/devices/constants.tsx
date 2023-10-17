import { ModelType } from '../../../three-dimensional-scene/type'
import ForkTruck, { IForkTruckCar } from './ForkTruck'
import FourWayCar, { IFourWayCar } from './FourWayCar'
import MxwCar, { IMxwCar } from './MxwCar'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const modelRenderMap: Record<ModelType, (props: any) => JSX.Element> = {
  [ModelType.MxwCar]: (props: IMxwCar) => <MxwCar {...props} />,
  [ModelType.ForkTruck]: (props: IForkTruckCar) => <ForkTruck {...props} />,
  [ModelType.FourWay]: (props: IFourWayCar) => <FourWayCar {...props} />
}

export const modelNameMap = {
  [ModelType.MxwCar]: '劢小微',
  [ModelType.ForkTruck]: '堆高车',
  [ModelType.FourWay]: '四向穿'
}
