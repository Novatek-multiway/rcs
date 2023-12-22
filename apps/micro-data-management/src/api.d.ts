declare namespace ReportAPI {
  /**
   * 电量统计数据
   */
  interface Electricity {
    dayCount: number
    grandTotal: number
    labels: string[]
    values: ElectricityValue[]
  }

  interface ElectricityValue {
    list: number[]
    title: string
  }

  /**
   * 效率统计数据
   */
  interface Efficiency {
    efficiencyStatisticsDtos: EfficiencyStatisticsDto[]
    trafficControl: number
    troubleprool: number
    useRatio: number
  }

  interface EfficiencyStatisticsDto {
    id?: number
    trafficControl?: number
    troubleprool?: number
    useRatio?: number
  }

  /**
   * 车辆运行时间占比数据
   */
  interface TimeRatio {
    chargeTime: number
    freeTime: number
    performanceDto: PerformanceDto[]
    trafficTime: number
    workTime: number
  }

  interface PerformanceDto {
    chargeTime: number
    freeTime: number
    id: number
    trafficTime: number
    workTime: number
  }

  /**
   * 稼动率
   */
  interface UtilizationRate {
    labels: string[]
    values: UtilizationRateValue[]
  }

  interface UtilizationRateValue {
    list: number[]
    title: string
  }

  /**
   * 无故障时间统计
   */
  interface NoFaultTime {
    labels: string[]
    values: NoFaultTimeValue[]
    [property: string]: any
  }

  interface NoFaultTimeValue {
    list: number[]
    title: string
    [property: string]: any
  }

  /**
   * 车辆完成任务数
   */
  interface FinishedTasks {
    labels: string[]
    values: FinishedTasksValue[]
    [property: string]: any
  }

  interface FinishedTasksValue {
    list: number[]
    title: string
    [property: string]: any
  }
  /**
   * 车辆运行公里数
   */
  export interface Mileage {
    labels: string[]
    values: MileageValue[]
    [property: string]: any
  }

  export interface MileageValue {
    list: number[]
    title: string
    [property: string]: any
  }
}
