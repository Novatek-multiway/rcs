import { Add, Remove, Search } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import React, { FC, memo, PropsWithChildren, useEffect, useMemo } from 'react'
import { Layer } from 'react-konva'
import { Button, createTheme, SvgIcon, ThemeProvider } from 'ui'

import data from '@/mock/data.json'

import AutoResizerStage from './components/autoResizerStage'
import Points from './components/points'
import { usePoints } from './components/points/usePoints'
import { useStore } from './store'
import { ToolbarWrapper, TwoDMapWrapper } from './style'

const mapData = JSON.parse((data as any).data) as API.RootMapObject

interface ITwoDMapProps {
  toolbarRight?: number
}

const MeasuringScaleSize = 50
// 2D地图
const TwoDMap: FC<PropsWithChildren<ITwoDMapProps>> = (props) => {
  const { toolbarRight = 300 } = props
  const mapSize = useMemo(() => {
    const { DWGMaxX, DWGMinX, DWGMaxY, DWGMinY } = mapData.MapOption
    return { width: Math.abs(DWGMaxX - DWGMinX), height: Math.abs(DWGMaxY - DWGMinY) }
  }, [])

  const { cursorPosition, currentScale, stageMapRatio, setCurrentScale, setMapSize } = useStore((state) => ({
    currentScale: state.currentScale,
    cursorPosition: state.cursorPosition,
    setCurrentScale: state.setCurrentScale,
    stageMapRatio: state.stageMapRatio,
    setMapSize: state.setMapSize
  }))

  useEffect(() => {
    setMapSize(mapSize)
  }, [mapSize, setMapSize])

  const toolbarSprings = useSpring({
    right: toolbarRight
  })

  const points = usePoints(mapData.Vertexs)

  return (
    <TwoDMapWrapper>
      <AutoResizerStage>
        {/* 不需要改变的层 */}
        <Layer listening={false}>
          <Points points={points} />
        </Layer>
      </AutoResizerStage>
      {/* 光标位置 */}
      <div className="cursor-position">
        {(cursorPosition.x / stageMapRatio).toFixed(2)},{(cursorPosition.y / stageMapRatio).toFixed(2)}
      </div>
      {/* 比例尺 */}
      <div className="measuring-scale">
        <SvgIcon sx={{ width: MeasuringScaleSize + 'px', height: MeasuringScaleSize + 'px' }} color="primary">
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
        <span>{((MeasuringScaleSize / stageMapRatio) * currentScale).toFixed(2)}</span>
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
