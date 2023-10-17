import { useMemo } from 'react'
import { type RouteObject, useLocation } from 'react-router-dom'

import type { TLayoutRouteObject, TLayoutRoutes } from '../../types'

const useRoute = (routes: TLayoutRoutes) => {
  const location = useLocation()

  const findRoute = (routes: TLayoutRoutes, pathname: Required<RouteObject>['path']): TLayoutRouteObject | null => {
    let targetSet = [...routes]
    const pathnameKeys = pathname.split('/').filter(Boolean) // 当前路径的keys
    const length = pathnameKeys.length
    let pointer = 0 // 当前指针
    let target: TLayoutRouteObject | null | undefined = null
    while (pointer !== length) {
      target = targetSet.find((x) => x.path === pathnameKeys[pointer])
      if (!target) return null
      targetSet = target.children!
      pointer++
    }
    return target
  }

  const currentRoute = useMemo(() => findRoute(routes, location.pathname), [location])

  return currentRoute
}

export default useRoute
