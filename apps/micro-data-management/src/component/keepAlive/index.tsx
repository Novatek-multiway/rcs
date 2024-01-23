import { useUpdate } from 'ahooks'
import { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

const KeepAlive: FC<PropsWithChildren<{ exclude?: string[] }>> = (props) => {
  const { exclude = [] } = props
  const componentList = useRef(new Map())
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const forceUpdate = useUpdate()
  const isInExclude = exclude.some((item) => pathname.includes(item))

  useEffect(() => {
    if (isInExclude) return

    if (!componentList.current.has(pathname)) {
      componentList.current.set(pathname, outlet)
    }

    forceUpdate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isInExclude])

  return (
    <>
      {isInExclude
        ? outlet
        : Array.from(componentList.current).map(([key, component]) => (
            <div key={key} style={{ display: pathname === key ? 'block' : 'none', height: '100%' }}>
              {component}
            </div>
          ))}
    </>
  )
}

export default KeepAlive
