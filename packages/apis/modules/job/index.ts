import { request } from '../../request'
import { IResponse } from '../../type'

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const postGTaskList = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Job/GetTaskGInfos', {
    method: 'POST',
    data
  })
}

// 创建任务
export const createTask = (data: Record<string, any>) => {
  return request<IResponse<any>>('/Job/CreateTask', {
    method: 'POST',
    data
  })
}
// 取消任务
export const cancelTask = (Guid: string) => {
  return request<IResponse<any>>('/Job/CancelTask', {
    method: 'GET',
    params: {
      Guid
    }
  })
}

// 完成任务
export const completeTask = (Guid: string) => {
  return request<IResponse<any>>('/Job/CompletedTask', {
    method: 'GET',
    params: {
      Guid
    }
  })
}

// 获取任务组的任务信息
export const getTaskByGuid = (Guid: string) => {
  return request<IResponse<any>>('/Job/GetTaskInfo', {
    method: 'GET',
    params: {
      Guid
    }
  })
}

// 添加任务点
export const addTaskPoint = (data: { Guid: string; Points: any[] }) => {
  return request<IResponse<any>>('/Job/AddTaskPoint', {
    method: 'POST',
    data
  })
}
