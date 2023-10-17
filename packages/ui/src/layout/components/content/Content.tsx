import { useTheme } from '@mui/material'
import type { FC } from 'react'
import React, { memo, Suspense, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import useRoute from '../../hooks/useRoute'
import { TLayoutContentProps } from '../../types'
import { getRouteIdPath } from '../../utils/index'
import { ContentWrapper } from './style'

const Content: FC<TLayoutContentProps> = (props) => {
  const { routes } = props
  const navigate = useNavigate()
  const theme = useTheme()
  const route = useRoute(routes)
  const [activeMenuIndex, setActiveMenuIndex] = useState(-1)

  useEffect(() => {
    if (route?.id) {
      const routeIdPath = getRouteIdPath(routes, route?.id)
      const index = routes.findIndex((route) => route.id === routeIdPath[0])
      setActiveMenuIndex(index)
    }
  }, [route])

  const handleMenuItemClick = (route: TLayoutContentProps['routes'][0], index: number) => {
    navigate(route.path!)
    setActiveMenuIndex(index)
  }
  return (
    <ContentWrapper>
      <Suspense>
        <Outlet />
      </Suspense>
      <div className="menu">
        {routes.map((route, index) => (
          <div
            className="menu-item"
            style={
              {
                '--glow-color': index === activeMenuIndex ? theme.palette.primary.main : '#808699'
              } as React.CSSProperties
            }
            key={route.id}
            onClick={() => handleMenuItemClick(route, index)}
          >
            <div className="glowing-btn">
              <span className="glowing-txt"> {route.name}</span>
            </div>
          </div>
        ))}
      </div>
    </ContentWrapper>
  )
}

export default memo(Content)
