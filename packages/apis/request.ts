import { extend } from 'umi-request'

//全局请求参数设置
export const request = extend({
  timeout: 10000,
  baseURL: 'http://120.79.8.215:5200'
})

request.interceptors.request.use((url, options) => {
  const headers: any = options.headers
  headers['__tenant'] = '446a5211-3d72-4339-9adc-845151f8ada0'
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
    return data
  }
  return response
})
