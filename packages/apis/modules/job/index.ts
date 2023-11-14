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
