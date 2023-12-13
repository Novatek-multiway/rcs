import { useUpdateEffect, useWebSocket } from 'ahooks'
import { ReadyState } from 'ahooks/lib/useWebSocket'
import { ElementRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useGlobalStore } from 'store'

import { SystemConfigContext } from '@/components/SystemConfig'

import Aside, { IAsideProps } from './components/aside'
import TaskStats from './components/taskStats'
import TimeStats from './components/timeStats'
import TwoDMap from './components/twoDMap'
import UtilizationRateStats from './components/utilizationRateStats'
import VehicleStatus from './components/vehicleStatus'
import { useDashboardStore } from './store'
import { EWebsocketMessagePath, useWebsocketStore } from './store/websocket'
import { DashboardWrapper } from './style'

const WS_URL = `ws://127.0.0.1:10019`
const DEFAULT_TOOLBAR_RIGHT = 380
// 消息推送频率设置
const MESSAGE_INTERVAL_MAP = {
  [EWebsocketMessagePath.ReportGetOnLineCarriers]: 60,
  [EWebsocketMessagePath.ReportGetHomeChargeGoodsStations]: 1000,
  [EWebsocketMessagePath.ReportGetTimeSum]: 1000,
  [EWebsocketMessagePath.ReportGetAgvThroughs]: 1000,
  [EWebsocketMessagePath.ReportGetAgvStatus]: 1000,
  [EWebsocketMessagePath.ReportGetJobSumByAgv]: 1000
}

const Dashboard = () => {
  const logoTitleClickTime = useGlobalStore((state) => state.globalState.logoTitleClickTime)
  const { asideOpen, setAsideOpen } = useDashboardStore((state) => ({
    asideOpen: state.asideOpen,
    setAsideOpen: state.setAsideOpen
  }))
  const {
    setReportGetOnLineCarriers,
    setReportGetHomeChargeGoodsStations,
    setReportGetTimeSum,
    setReportGetAgvThroughs,
    setReportGetAgvStatus,
    setReportGetJobSumByAgv
  } = useWebsocketStore((state) => ({
    setReportGetOnLineCarriers: state.setReportGetOnLineCarriers,
    setReportGetHomeChargeGoodsStations: state.setReportGetHomeChargeGoodsStations,
    setReportGetTimeSum: state.setReportGetTimeSum,
    setReportGetAgvThroughs: state.setReportGetAgvThroughs,
    setReportGetAgvStatus: state.setReportGetAgvStatus,
    setReportGetJobSumByAgv: state.setReportGetJobSumByAgv
  }))

  const RECEIVE_MESSAGE_STRATEGY = useMemo<Record<EWebsocketMessagePath, (data: any) => void>>(
    () => ({
      [EWebsocketMessagePath.ReportGetOnLineCarriers]: (data: any) =>
        setReportGetOnLineCarriers(JSON.parse(data.Model)),
      [EWebsocketMessagePath.ReportGetHomeChargeGoodsStations]: (data: any) =>
        setReportGetHomeChargeGoodsStations(JSON.parse(data.Model)),
      [EWebsocketMessagePath.ReportGetTimeSum]: (data: any) => setReportGetTimeSum(JSON.parse(data.Model)),
      [EWebsocketMessagePath.ReportGetAgvThroughs]: (data: any) => setReportGetAgvThroughs(JSON.parse(data.Model)),
      [EWebsocketMessagePath.ReportGetAgvStatus]: (data: any) => setReportGetAgvStatus(JSON.parse(data.Model)),
      [EWebsocketMessagePath.ReportGetJobSumByAgv]: (data: any) => setReportGetJobSumByAgv(JSON.parse(data.Model))
    }),
    [
      setReportGetOnLineCarriers,
      setReportGetHomeChargeGoodsStations,
      setReportGetTimeSum,
      setReportGetAgvThroughs,
      setReportGetAgvStatus,
      setReportGetJobSumByAgv
    ]
  )
  const systemConfig = useContext(SystemConfigContext)

  const { sendMessage, disconnect, readyState } = useWebSocket(systemConfig.network?.ws_url || WS_URL, {
    onMessage: (params: any) => {
      const data = JSON.parse(params.data)
      const path = data.Path as EWebsocketMessagePath
      RECEIVE_MESSAGE_STRATEGY[path](data)
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
