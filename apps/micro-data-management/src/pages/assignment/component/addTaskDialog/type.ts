export interface ITaskFormData {
  vehicleId: number | null
  priority: number
  isAutoCompleted: boolean
  taskPoint: number | null
  action: number
  param1: number
  param2: number
  param3: number
  param4: number
  id: number
}

export interface ITaskItem extends Pick<ITaskFormData, 'taskPoint' | 'id' | 'action' | 'isAutoCompleted'> {
  params: string
  handler?: any
}

export interface IOption {
  label: string
  value: string
}
