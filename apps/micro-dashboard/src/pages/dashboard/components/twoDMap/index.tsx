import { Add, Remove, Search } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import React, { FC, memo, PropsWithChildren, useEffect, useMemo } from 'react'
import { Layer } from 'react-konva'
import { Button, createTheme, SvgIcon, ThemeProvider } from 'ui'

import data from '@/mock/data.json'

import AutoResizerStage from './components/autoResizerStage'
import Lines from './components/lines'
import { useLines } from './components/lines/useLines'
import { useLinesInside } from './components/lines/useLinesInside'
import Points from './components/points'
import ImagePoints from './components/points/ImagePoints'
import LocationPoints from './components/points/LocationPoints'
import { usePoints } from './components/points/usePoints'
import { POINT_IMAGE_NAME_MAP } from './constants'
import { useShapesInside } from './hooks/useShapesInside'
import { useStore } from './store'
import { ToolbarWrapper, TwoDMapWrapper } from './style'

const mapData = JSON.parse((data as any).data) as API.RootMapObject
console.log('🚀 ~ file: index.tsx ~ line 22 ~ mapData', mapData)

interface ITwoDMapProps {
  toolbarRight?: number
}

const MEASURING_SCALE_SIZE = 50 // 比例尺的尺寸
const SCALE_BOUNDARY = 6.5 // 缩放显示边界（低于一定缩放值，部分元素不显示，提升初始化渲染性能）
// 2D地图
const TwoDMap: FC<PropsWithChildren<ITwoDMapProps>> = (props) => {
  const { toolbarRight = 300 } = props

  const { cursorPosition, currentScale, stageMapRatio, setCurrentScale, setMapSize, setMapCenterPosition } = useStore(
    (state) => ({
      currentScale: state.currentScale,
      cursorPosition: state.cursorPosition,
      setCurrentScale: state.setCurrentScale,
      stageMapRatio: state.stageMapRatio,
      setMapSize: state.setMapSize,
      setMapCenterPosition: state.setMapCenterPosition
    })
  )

  useEffect(() => {
    const { DWGMaxX, DWGMinX, DWGMaxY, DWGMinY } = mapData.MapOption
    const mapSize = { width: Math.abs(DWGMaxX - DWGMinX), height: Math.abs(DWGMaxY - DWGMinY) }
    setMapSize(mapSize)
    const mapCenterPosition = { x: DWGMinX + mapSize.width / 2, y: DWGMinY + mapSize.height / 2 }
    setMapCenterPosition(mapCenterPosition)
  }, [setMapSize, setMapCenterPosition])

  const toolbarSprings = useSpring({
    right: toolbarRight
  })

  const points = usePoints(mapData.Vertexs)
  const insidePoints = useShapesInside(points)
  const lines = useLines(mapData.Edges)
  const insideLines = useLinesInside(lines)
  // 停车点、充点电
  const imagePoints = useMemo(
    () =>
      insidePoints
        .filter((p) => !!POINT_IMAGE_NAME_MAP[p.type])
        .map((p) => ({ ...p, pointImageName: POINT_IMAGE_NAME_MAP[p.type] })),
    [insidePoints]
  )
  // 库位点
  const locationPoint = useMemo(() => insidePoints.filter((p) => p.type === 1 || p.type === 4), [insidePoints])

  return (
    <TwoDMapWrapper>
      <AutoResizerStage>
        {/* 不需要改变的层 */}
        <Layer listening={false}>
          <Lines lines={insideLines} />
        </Layer>

        {/* 缩放大于一定值才显示的层 */}
        {currentScale >= SCALE_BOUNDARY && (
          <Layer listening={false}>
            <LocationPoints points={locationPoint} />
            <Points points={insidePoints} />
            <ImagePoints points={imagePoints} />
          </Layer>
        )}
      </AutoResizerStage>
      {/* 光标位置 */}
      <div className="cursor-position">
        {(cursorPosition.x / stageMapRatio).toFixed(2)},{(cursorPosition.y / stageMapRatio).toFixed(2)}
      </div>
      {/* 比例尺 */}
      <div className="measuring-scale">
        <SvgIcon sx={{ width: MEASURING_SCALE_SIZE + 'px', height: MEASURING_SCALE_SIZE + 'px' }} color="primary">
          <svg
            viewBox="0 0 3198 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4666"
            width="100"
            height="100"
            fill="currentColor"
          >
            <path
              d="M3092.076038 1024H106.787438A106.787438 106.787438 0 0 1 0 917.212562v-549.192539a106.787438 106.787438 0 0 1 213.574876 0v442.405101h2771.713724v-442.405101a106.787438 106.787438 0 1 1 213.574877 0v549.192539a106.787438 106.787438 0 0 1-106.787439 106.787438z"
              p-id="4667"
            ></path>
          </svg>
        </SvgIcon>
        <span>{(MEASURING_SCALE_SIZE / stageMapRatio / currentScale).toFixed(2)}</span>
      </div>
      <ToolbarWrapper style={toolbarSprings}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              primary: {
                main: '#a4a5a7'
              }
            }
          })}
        >
          <Button variant="contained" sx={{ minWidth: 'auto' }} onClick={() => setCurrentScale(currentScale + 0.1)}>
            <Add color="info" />
          </Button>
          <Button variant="contained" sx={{ minWidth: 'auto' }} onClick={() => setCurrentScale(currentScale - 0.1)}>
            <Remove color="info" />
          </Button>
          <Button variant="contained" sx={{ minWidth: 'auto' }}>
            <Search color="info" />
          </Button>
        </ThemeProvider>
      </ToolbarWrapper>
    </TwoDMapWrapper>
  )
}

export default memo(TwoDMap)
