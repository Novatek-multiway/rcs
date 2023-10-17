import { request } from '../../request'
import { IResponse } from '../../type'
import { IKeyValue, Layout } from './type'

/**
 * Fetches the layout from the server.
 *
 * @returns Promise of the layout object.
 */
export const getLayout = () => {
  return request<IResponse<Layout>>('/api/dts/layout', {
    method: 'GET'
  })
}

export const getKeyValue = () => {
  return request<IResponse<IKeyValue[]>>('/api/dts/key-value/items')
}

export * from './type.d'
// export type { Layout };
