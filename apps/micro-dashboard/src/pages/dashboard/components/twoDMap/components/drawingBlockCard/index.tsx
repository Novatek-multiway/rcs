import { Close, Delete, Draw, Edit, OpenWith, PentagonOutlined, RectangleOutlined } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import { useVoerkaI18n } from '@voerkai18n/react'
import { useUpdateEffect } from 'ahooks'
import { createTrafficBlock, delTrafficBlock, getTrafficBlock } from 'apis'
import _ from 'lodash'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from 'ui'

import { EStageMode } from '../../constants'
import { EDrawingType, TPolygonResult, TRectResult } from '../../hooks/useKonvaDrawing'
import { useTwoDMapStore } from '../../store'
import BlockDialog, { IBlockDialogProps } from './BlockDialog'
import { DrawingBlockCardWrapper } from './style'

interface IDrawingBlockCardProps {}

const DrawingTypeIconMap = {
  [EDrawingType.RECT]: <RectangleOutlined />,
  [EDrawingType.POLYGON]: <PentagonOutlined />
}

const DrawingBlockCard: FC<PropsWithChildren<IDrawingBlockCardProps>> = () => {
  const {
    isDrawingBlockCardOpen,
    setIsDrawingBlockCardOpen,
    stageMode,
    setStageMode,
    drawingType,
    setDrawingType,
    drawingResultListMap,
    setDrawingResultListMap,
    drawingSelectedId,
    setDrawingSelectedId,
    newDrawingResult,
    setNewDrawingResult,
    stageMapRatio
  } = useTwoDMapStore((state) => ({
    isDrawingBlockCardOpen: state.isDrawingBlockCardOpen,
    setIsDrawingBlockCardOpen: state.setIsDrawingBlockCardOpen,
    stageMode: state.stageMode,
    setStageMode: state.setStageMode,
    drawingType: state.drawingType,
    setDrawingType: state.setDrawingType,
    drawingResultListMap: state.drawingResultListMap,
    setDrawingResultListMap: state.setDrawingResultListMap,
    drawingSelectedId: state.drawingSelectedId,
    setDrawingSelectedId: state.setDrawingSelectedId,
    newDrawingResult: state.newDrawingResult,
    setNewDrawingResult: state.setNewDrawingResult,
    stageMapRatio: state.stageMapRatio
  }))
  const { t } = useVoerkaI18n()

  const drawResultList = useMemo(() => Object.values(drawingResultListMap).flat(), [drawingResultListMap])

  const drawingBlockCardSprings = useSpring({
    right: isDrawingBlockCardOpen ? 24 : -324
  })

  const handleClose = useCallback(() => {
    setIsDrawingBlockCardOpen(false)
    setDrawingResultListMap({
      rect: [],
      polygon: []
    })
    setStageMode(EStageMode.DRAG)
  }, [setIsDrawingBlockCardOpen, setDrawingResultListMap, setStageMode])

  /* -------------------------------- 获取初始化区块信息 ------------------------------- */
  const [trafficBlocksData, setTrafficBlocksData] = useState<TrafficAPI.Block[]>([])
  const fetchTrafficBlock = useCallback(async () => {
    const trafficBlockRes = await getTrafficBlock()
    const trafficBlocks = trafficBlockRes.data as TrafficAPI.Block[]
    const newDrawingResultListMap = { ...drawingResultListMap }
    newDrawingResultListMap.polygon = trafficBlocks.map((block) => ({
      id: block.id + '',
      type: EDrawingType.POLYGON,
      data: block.border?.flatMap((border) => [border.x * stageMapRatio, -border.y * stageMapRatio]) || []
    }))
    setDrawingResultListMap(newDrawingResultListMap)
    setTrafficBlocksData(trafficBlocks)
  }, [setDrawingResultListMap, drawingResultListMap, stageMapRatio])
  useEffect(() => {
    fetchTrafficBlock()

    return () => {
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------- 获取初始化区块信息 ------------------------------- */

  /* ---------------------------------- 新增、编辑区块 ---------------------------------- */
  const [addBlockDialogOpen, setBlockDialogOpen] = useState(false)
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [blockInitialValue, setBlockInitialValue] = useState<Partial<IBlockDialogProps['initialValue']>>({})
  const [blockPoints, setBlockPoints] = useState<{ x: number; y: number }[]>([])
  // 当前绘制的坐标点

  const getBlockPoints = useCallback(
    (drawResult: (typeof drawResultList)[0]) => {
      if (drawResult?.type === EDrawingType.RECT) {
        const rectData = drawResult.data as TRectResult
        const { x, y, width, height } = {
          x: rectData.x / stageMapRatio,
          y: rectData.y / stageMapRatio,
          width: rectData.width / stageMapRatio,
          height: rectData.height / stageMapRatio
        }
        return [
          { x, y },
          {
            x: x + width,
            y
          },
          { x: x + width, y: y + height },
          { x, y: y + height }
        ]
      } else if (drawResult?.type === EDrawingType.POLYGON) {
        return _.chunk(drawResult.data as TPolygonResult, 2).map((p) => ({
          x: p[0] / stageMapRatio,
          y: p[1] / stageMapRatio
        }))
      }
      return []
    },
    [stageMapRatio]
  )
  useUpdateEffect(() => {
    // 绘制图形后打开添加弹窗
    if (newDrawingResult) {
      setMode('add')
      setBlockInitialValue({})
      setBlockPoints(getBlockPoints(newDrawingResult))
      setBlockDialogOpen(true)
    }
  }, [newDrawingResult])

  // 点位、路径、车辆为了与地图保持一致，y轴取反， 所以这里需要取反
  const reverseYPoints = useMemo(() => blockPoints.map((p) => ({ x: p.x, y: -p.y })), [blockPoints])

  const handleSubmit = useCallback<NonNullable<IBlockDialogProps['onSubmit']>>(
    async (values) => {
      const data = {
        ...values,
        points: reverseYPoints
      }

      if (mode === 'add') {
        await createTrafficBlock(data)
      }
      {
        // TODO 调用更新区块接口
        console.log('🚀 ~ file: index.tsx ~ line 154 ~ data', data)
      }
      fetchTrafficBlock()
    },
    [reverseYPoints, fetchTrafficBlock, mode]
  )
  const handleBlockDialogClose = useCallback<NonNullable<IBlockDialogProps['onClose']>>(() => {
    setBlockDialogOpen(false)
    // 点击取消需要清空已经绘制的图形
    if (!newDrawingResult) return
    const newDrawingResultListMap = { ...drawingResultListMap }
    const drawingRectResultList = newDrawingResultListMap[newDrawingResult!.type]
    const index = drawingRectResultList.findIndex((d) => d.id === newDrawingResult!.id)
    drawingRectResultList.splice(index, 1)
    setDrawingResultListMap(newDrawingResultListMap)
    setNewDrawingResult(null)
  }, [newDrawingResult, drawingResultListMap, setDrawingResultListMap, setNewDrawingResult])
  /* ---------------------------------- 新增区块 ---------------------------------- */

  /* -------------------------------- 舞台操作模式选择 -------------------------------- */
  const handleStageModeChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newStageMode: EStageMode | null) => {
      if (!newStageMode) return
      setStageMode(newStageMode)
    },
    [setStageMode]
  )
  const renderStageMode = () => (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {t('工具')}
      </Typography>
      <ToggleButtonGroup sx={{ mb: 2 }} value={stageMode} exclusive size="small" onChange={handleStageModeChange}>
        <ToggleButton value={EStageMode.DRAG} aria-label="drag">
          <Tooltip title={t('拖拽')}>
            <OpenWith />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value={EStageMode.DRAW} aria-label="draw">
          <Tooltip title={t('绘图')}>
            <Draw />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )

  /* -------------------------------- 舞台操作模式选择 -------------------------------- */

  /* --------------------------------- 绘图类型选择 --------------------------------- */

  const renderDrawingType = () => (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        {t('区块类型')}
      </Typography>
      <ToggleButtonGroup sx={{ mb: 2 }} value={drawingType} exclusive size="small" onChange={handleDrawingTypeChange}>
        {/* <ToggleButton value={EDrawingType.RECT} aria-label="rect">
         <Tooltip title="矩形">{DrawingTypeIconMap[EDrawingType.RECT]}</Tooltip>
        </ToggleButton> */}
        <ToggleButton value={EDrawingType.POLYGON} aria-label="polygon">
          <Tooltip title={t('多边形')}>{DrawingTypeIconMap[EDrawingType.POLYGON]}</Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )

  const handleDrawingTypeChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newDrawingType: EDrawingType | null) => {
      if (!newDrawingType) return
      setDrawingType(newDrawingType)
    },
    [setDrawingType]
  )
  /* --------------------------------- 绘图类型选择 --------------------------------- */

  /* ---------------------------------- 绘图结果 ---------------------------------- */
  const handleDeleteClick = useCallback(
    async (drawResult: (typeof drawingResultListMap)[keyof typeof drawingResultListMap][0]) => {
      await delTrafficBlock(Number(drawResult.id))
      fetchTrafficBlock()
    },
    [fetchTrafficBlock]
  )
  const handleEditClick = useCallback(
    (drawResult: (typeof drawResultList)[0]) => {
      setMode('edit')
      const findTrafficBlock = trafficBlocksData.find((d) => d.id + '' === drawResult.id)
      setBlockInitialValue({
        type: findTrafficBlock?.type,
        floor: findTrafficBlock?.floor,
        maxNumber: findTrafficBlock?.maxNumber
      })
      setBlockPoints(getBlockPoints(drawResult))
      setBlockDialogOpen(true)
    },
    [trafficBlocksData, getBlockPoints]
  )
  const renderDrawResult = () => (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        {t('区块信息')}
      </Typography>
      <Card sx={{ bgcolor: 'transparent', position: 'relative' }}>
        <List
          sx={{
            position: 'static',
            maxHeight: 300,
            overflowY: 'auto',
            pt: 6
          }}
        >
          <ListItem
            sx={{
              position: 'absolute',
              top: 0,
              // bgcolor: 'background.paper',
              zIndex: 1
            }}
            secondaryAction={<div style={{ width: '80px', textAlign: 'center' }}>{t('操作')}</div>}
          >
            <ListItemIcon>
              <span>{t('类型')}</span>
            </ListItemIcon>
            <ListItemText primary="ID" />
          </ListItem>
          {drawResultList.map((drawResult) => (
            <ListItem
              key={drawResult.id}
              secondaryAction={
                <>
                  <IconButton aria-label="delete" onClick={() => handleDeleteClick(drawResult)}>
                    <Delete />
                  </IconButton>
                  <IconButton style={{ display: 'none' }} aria-label="edit" onClick={() => handleEditClick(drawResult)}>
                    <Edit />
                  </IconButton>
                </>
              }
              sx={{
                bgcolor: drawingSelectedId === drawResult.id ? 'gray' : 'transparent'
              }}
              onMouseEnter={() => setDrawingSelectedId(drawResult.id)}
              onMouseLeave={() => setDrawingSelectedId('')}
            >
              <ListItemIcon>{DrawingTypeIconMap[drawResult.type]}</ListItemIcon>
              <ListItemText primary={drawResult.id} />
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  )

  /* ---------------------------------- 绘制结果 ---------------------------------- */

  return (
    <>
      <DrawingBlockCardWrapper style={drawingBlockCardSprings}>
        <Card>
          <CardContent sx={{ gap: 10 }}>
            <Button disableRipple sx={{ position: 'absolute', right: 6, top: 6 }} onClick={handleClose}>
              <Close />
            </Button>
            {renderStageMode()}
            {renderDrawingType()}
            {renderDrawResult()}
          </CardContent>
        </Card>
      </DrawingBlockCardWrapper>
      <BlockDialog
        title={mode === 'add' ? t('新增区块信息') : t('编辑区块信息')}
        initialValue={blockInitialValue}
        open={addBlockDialogOpen}
        points={reverseYPoints}
        onClose={handleBlockDialogClose}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default memo(DrawingBlockCard)
