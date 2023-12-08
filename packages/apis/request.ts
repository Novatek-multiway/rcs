import { extend } from 'umi-request'
import { toastError } from 'utils'

//全局请求参数设置
export const request = extend({
  timeout: 60000,
  // 记得区分开发环境与生产环境
  prefix: '/api'
})

request.interceptors.request.use((url, options) => {
  const userInfo = localStorage.getItem('userInfo')
  const headers: any = options.headers
  headers['Authorization'] = JSON.parse(userInfo || '{}').jwtToken
  return {
    url,
    options: {
      ...options,
      headers
    }
  }
})

request.interceptors.response.use(async (response) => {
  const { status } = response
  if (status === 200) {
    const data = await response.clone().json()
    if (data.code !== 0) {
      toastError(data.msg)
      return Promise.reject(data.msg)
    }
    return data
  } else {
    toastError(response.statusText)
    return Promise.reject(response.statusText)
  }
})
