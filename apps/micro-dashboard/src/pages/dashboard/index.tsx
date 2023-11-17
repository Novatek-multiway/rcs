import { useUpdateEffect, useWebSocket } from 'ahooks'
import { ReadyState } from 'ahooks/lib/useWebSocket'
import { ElementRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useGlobalStore } from 'store'

import Aside, { IAsideProps } from './components/aside'
import TaskStats from './components/taskStats'
import TimeStats from './components/timeStats'
import TwoDMap from './components/twoDMap'
import UtilizationRateStats from './components/utilizationRateStats'
import VehicleStatus from './components/vehicleStatus'
import { useDashboardStore } from './store'
import { EWebsocketMessagePath, useWebsocketStore } from './store/websocket'
import { DashboardWrapper } from './style'

const WS_URL = 'ws://192.168.1.240:10019'
const DEFAULT_TOOLBAR_RIGHT = 380
// 消息推送频率设置
const MESSAGE_INTERVAL_MAP = {
  [EWebsocketMessagePath.ReportGetOnLineCarriers]: 60,
  [EWebsocketMessagePath.ReportGetHomeChargeGoodsStations]: 1000
}

const Dashboard = () => {
  const logoTitleClickTime = useGlobalStore((state) => state.globalState.logoTitleClickTime)
  const { asideOpen, setAsideOpen } = useDashboardStore((state) => ({
    asideOpen: state.asideOpen,
    setAsideOpen: state.setAsideOpen
  }))
  const { setReportGetOnLineCarriers, setReportGetHomeChargeGoodsStations } = useWebsocketStore((state) => ({
    setReportGetOnLineCarriers: state.setReportGetOnLineCarriers,
    setReportGetHomeChargeGoodsStations: state.setReportGetHomeChargeGoodsStations
  }))
  const { sendMessage, disconnect, readyState } = useWebSocket(WS_URL, {
    onMessage: (params: any) => {
      const data = JSON.parse(params.data)
      if (data.Path === EWebsocketMessagePath.ReportGetOnLineCarriers) {
        setReportGetOnLineCarriers(JSON.parse(data.Model))
      } else if (data.Path === EWebsocketMessagePath.ReportGetHomeChargeGoodsStations) {
        setReportGetHomeChargeGoodsStations(JSON.parse(data.Model))
      }
    },
    onOpen: () => {},
    reconnectInterval: 10000,
    reconnectLimit: 5
  })

  useEffect(() => {
    if (readyState === ReadyState.Open) {
      Object.values(EWebsocketMessagePath).forEach((p) => {
        const message = JSON.stringify({
          Path: p,
          Interval: MESSAGE_INTERVAL_MAP[p]
        })
        sendMessage && sendMessage(message)
      })
    }
  }, [readyState, sendMessage])

  useEffect(() => {
    return () => disconnect && disconnect()
  }, [disconnect])

  const asideRef = useRef<ElementRef<typeof Aside>>(null)

  useUpdateEffect(() => {
    const asideOpen = asideRef.current?.asideOpen
    setAsideOpen(!asideOpen)
  }, [logoTitleClickTime])

  useUpdateEffect(() => {
    const aside = asideRef.current
    const asideWidth = aside?.asideWidth || 300
    setToolbarRight((p) => (aside?.asideOpen ? p - asideWidth : p + asideWidth))
    asideOpen ? aside?.showAside() : aside?.hideAside()
  }, [asideOpen])

  const [toolbarRight, setToolbarRight] = useState(DEFAULT_TOOLBAR_RIGHT)
  const handleSizeChange = useCallback<NonNullable<IAsideProps['onSizeChange']>>(
    (size) => {
      setToolbarRight(asideOpen ? (size?.width || 360) + 20 : 20)
    },
    [asideOpen]
  )

  useEffect(() => {
    return () => {
      setAsideOpen(true)
      setToolbarRight(DEFAULT_TOOLBAR_RIGHT)
    }
  }, [setAsideOpen])
  return (
    <DashboardWrapper>
      <div className="content">
        <Aside
          ref={asideRef}
          left={
            <>
              <TimeStats />
              <UtilizationRateStats />
            </>
          }
          right={
            <>
              <VehicleStatus />
              <TaskStats />
            </>
          }
          onSizeChange={handleSizeChange}
        />
        <TwoDMap toolbarRight={toolbarRight} />
      </div>
    </DashboardWrapper>
  )
}

export default memo(Dashboard)
