import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getInitStates, getMapFunction, getOnLineCarriers, updateMapFunction } from 'apis'
import React, { FC, memo, PropsWithChildren, useState } from 'react'
import { CircularProgress } from 'ui'

import { useWebsocketStore } from '../../store/websocket'
import AutoResizerStage from './components/autoResizerStage'
import CursorPosition from './components/cursorPosition'
import DrawingBlockCard from './components/drawingBlockCard'
import MeasuringScale from './components/measuringScale'
import SearchArea from './components/searchArea'
import Toolbar from './components/toolbar'
import { Switches } from './components/toolbar/components/settings/constant'
import { EMapSettingsKeys } from './constants'
import { useTwoDMapStore } from './store'
import { TwoDMapWrapper } from './style'

interface ITwoDMapProps {
  toolbarRight?: number
}

// 2D地图
const TwoDMap: FC<PropsWithChildren<ITwoDMapProps>> = (props) => {
  const { toolbarRight = 300 } = props
  const {
    isLoading,
    setIsLoading,
    setMapSize,
    setMapCenterPosition,
    setSettingSwitches,
    setSettings,
    currentChangedSwitch,
    isDrawingBlockCardOpen,
    searchAreaVisible
  } = useTwoDMapStore((state) => ({
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
    setMapSize: state.setMapSize,
    setMapCenterPosition: state.setMapCenterPosition,
    setSettingSwitches: state.setSettingSwitches,
    setSettings: state.setSettings,
    currentChangedSwitch: state.currentChangedSwitch,
    isDrawingBlockCardOpen: state.isDrawingBlockCardOpen,
    searchAreaVisible: state.searchAreaVisible
  }))
  const { onlineCarriers, homeChargeGoodsStations } = useWebsocketStore((state) => ({
    onlineCarriers: state['Report/GetOnLineCarriers'],
    homeChargeGoodsStations: state['Report/GetHomeChargeGoodsStations']
  }))

  const [mapData, setMapData] = useState<MapAPI.RootMapObject | null>(null)
  const [vehiclesData, setVehiclesData] = useState<ReportAPI.OnlineCarrier[]>([])

  useAsyncEffect(async () => {
    setIsLoading(true)

    /* ---------------------------------- 地图数据 ---------------------------------- */
    const mapRes = await getInitStates()
    const mapData: MapAPI.RootMapObject = JSON.parse(mapRes.data)
    setMapData(mapData)
    /* ---------------------------------- 地图数据 ---------------------------------- */

    /* ---------------------------------- 车辆数据 ---------------------------------- */
    const vehiclesRes = await getOnLineCarriers()
    const vehiclesData: ReportAPI.OnlineCarrier[] = vehiclesRes.data
    setVehiclesData(vehiclesData)
    /* ---------------------------------- 车辆数据 ---------------------------------- */

    /* ---------------------------------- 开关设置 ---------------------------------- */
    const settingSwitchesRes = await getMapFunction()
    const mapFunctionData: MapAPI.MapFunction = settingSwitchesRes.data
    const settingSwitchesData = JSON.parse(mapFunctionData.functionValue) as MapAPI.MapFunctionItem[]
    const settingSwitches = settingSwitchesData
      .map((item) => ({
        id: item.Id,
        label: item.FunctionName,
        sort: item.FunctionSort,
        showed: item.Showed,
        enabled: item.Enabled,
        key: Switches.find((s) => s.label === item.FunctionName)?.key as EMapSettingsKeys
      }))
      .filter((item) => item.key)
    setSettingSwitches(settingSwitches) // 存储后端开关数据
    const settings = Object.fromEntries(settingSwitches.map((switchItem) => [switchItem.key, switchItem.enabled]))
    setSettings(settings)
    /* ---------------------------------- 开关设置 ---------------------------------- */

    setIsLoading(false)
  }, [])

  useUpdateEffect(() => {
    if (!mapData) return
    const { DWGMaxX, DWGMinX, DWGMaxY, DWGMinY } = mapData.MapOption
    const mapSize = { width: Math.abs(DWGMaxX - DWGMinX), height: Math.abs(DWGMaxY - DWGMinY) }
    setMapSize(mapSize)
    const mapCenterPosition = { x: DWGMinX + mapSize.width / 2, y: DWGMinY + mapSize.height / 2 }
    setMapCenterPosition(mapCenterPosition)
  }, [setMapSize, setMapCenterPosition, mapData])

  /* ---------------------------------- 更新开关 ---------------------------------- */
  useUpdateEffect(() => {
    if (!currentChangedSwitch) return
    const _updateMapFunction = async () => {
      const { id, label, showed, enabled, sort } = currentChangedSwitch
      await updateMapFunction({
        id: id,
        functionName: label,
        enabled,
        showed,
        functionSort: sort
      })
    }
    _updateMapFunction()
  }, [currentChangedSwitch])
  /* ---------------------------------- 更新开关 ---------------------------------- */

  /* ---------------------------------- 实时推送 ---------------------------------- */
  // 车辆状态更新
  useUpdateEffect(() => {
    console.log('🚀 ~ file: index.tsx ~ line 118 ~ onlineCarriers', onlineCarriers)
    // setVehiclesData(onlineCarriers)
  }, [onlineCarriers])
  // 库位点状态更新
  useUpdateEffect(() => {
    if (!mapData) return
    const newMapData = { ...mapData }
    const vertexes = newMapData.Vertexs
    const locations = homeChargeGoodsStations.filter((d) => d.type === 1 || d.type === 4)
    console.log('🚀 ~ file: index.tsx ~ line 124 ~ useUpdateEffect ~ locations', locations)
    locations.forEach((l) => {
      const vertex = vertexes?.find((v) => v.ID === l.id)
      // 修改对应点的库位状态
      if (vertex) {
        vertex.LocationState = l.LocationState
      }
    })
    setMapData(newMapData)
  }, [homeChargeGoodsStations])
  /* ---------------------------------- 实时推送 ---------------------------------- */

  return (
    <TwoDMapWrapper>
      <AutoResizerStage mapData={mapData} vehiclesData={vehiclesData}></AutoResizerStage>
      {/* 光标位置 */}
      <CursorPosition />
      {/* 比例尺 */}
      <MeasuringScale />
      {/* 工具栏 */}
      <Toolbar toolbarRight={toolbarRight} />
      {/* 绘制区块窗口 */}
      {isDrawingBlockCardOpen && <DrawingBlockCard />}
      {/* loading */}
      {isLoading && (
        <CircularProgress
          color="inherit"
          sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
      {searchAreaVisible && <SearchArea />}
    </TwoDMapWrapper>
  )
}

export default memo(TwoDMap)
