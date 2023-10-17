import { TLayoutRouteObject, TLayoutRoutes } from '../types'

/**
 * @description: 根据id获取对应的路由和所有父级路由的key组成的数组
 * @return {*}
 */
export const getRouteIdPath = (routes: TLayoutRoutes, id: TLayoutRouteObject['id']): TLayoutRouteObject['id'][] => {
  for (const route of routes) {
    if (route.id === id) {
      return [route.id]
    }

    if (route.children) {
      const childIds = getRouteIdPath(route.children, id)
      if (childIds.length > 0) {
        return [route.id, ...childIds]
      }
    }
  }

  return []
}
