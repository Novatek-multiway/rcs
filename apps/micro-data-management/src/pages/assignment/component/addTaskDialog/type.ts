export interface ITaskFormData {
  vehicleId: number | null
  priority: number
  isAutoCompleted: boolean
  taskPoint: number
  action: number
  param1: number
  param2: number
  param3: number
  param4: number
  id: number
}

export interface ITaskItem {
  taskPoint: number
  action: number
  params: string
  id: number
  isAutoCompleted: boolean
  handler?: any
}

export interface IOption {
  label: string
  value: string
}
