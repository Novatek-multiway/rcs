// 显示成图片的点位对应图片名称的映射
export const POINT_IMAGE_NAME_MAP: Record<number, string> = {
  2: 'parking', // 待命点
  6: 'charge' // 充点电
}

// 车辆灯光效果
export enum EVehicleLightImageName {
  BLUE = 'circleBlue',
  RED = 'circleRed',
  WHITE = 'circleWhite',
  YELLOW = 'circleYellow'
}

// 地图设置的KEY
export enum EMapSettingsKeys {
  IS_LOCATION_VISIBLE = 'isLocationVisible',
  IS_POINT_VISIBLE = 'isPointVisible',
  IS_DIRECTION_VISIBLE = 'isDirectionVisible',
  IS_VEHICLE_OUTLINE_VISIBLE = 'isVehicleOutlineVisible',
  IS_VEHICLE_IMAGE_VISIBLE = 'isVehicleImageVisible',
  IS_VEHICLE_BENCHMARK_VISIBLE = 'isVehicleBenchmarkVisible',
  IS_VEHICLE_ON_WORK_VISIBLE = 'isVehicleOnWorkVisible',
  IS_VEHICLE_PLANNING_VISIBLE = 'isVehiclePlanningVisible',
  IS_FAULTY_VEHICLE_VISIBLE = 'isFaultyVehicleVisible',
  IS_VEHICLE_DETAIL_VISIBLE = 'isVehicleDetailVisible',
  IS_VEHICLE_PLANNING_SINGLE_COLOR = 'isVehiclePlanningSingleColor',
  IS_DEV_MODE = 'isDevMode',
  IS_STATION_VISIBLE = 'isStationVisible',
  LINE_COLOR = 'lineColor',
  PLANNING_LINE_COLOR = 'planningLineColor'
}

// 舞台操作模式
export enum EStageMode {
  DRAG = 'drag',
  DRAW = 'draw'
}
