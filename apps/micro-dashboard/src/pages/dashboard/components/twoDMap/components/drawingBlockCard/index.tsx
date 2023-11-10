import { Close, Delete, Draw, OpenWith, PentagonOutlined, RectangleOutlined } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import { useUpdateEffect } from 'ahooks'
import { createTrafficBlock, delTrafficBlock, getTrafficBlock } from 'apis'
import _ from 'lodash'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Box,
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
import AddBlockDialog, { IAddBlockDialogProps } from './AddBlockDialog'
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
  const fetchTrafficBlock = useCallback(async () => {
    const trafficBlockRes = await getTrafficBlock()
    const trafficBlocks = trafficBlockRes.data as TrafficAPI.Block[]
    const newDrawingResultListMap = { ...drawingResultListMap }
    newDrawingResultListMap.polygon = trafficBlocks.map((block) => ({
      id: block.id + '',
      type: EDrawingType.POLYGON,
      data: block.border?.flatMap((border) => [border.x * stageMapRatio, border.y * stageMapRatio]) || []
    }))
    setDrawingResultListMap(newDrawingResultListMap)
  }, [setDrawingResultListMap, drawingResultListMap, stageMapRatio])
  useEffect(() => {
    fetchTrafficBlock()

    return () => {
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /* -------------------------------- 获取初始化区块信息 ------------------------------- */

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
        工具
      </Typography>
      <ToggleButtonGroup sx={{ mb: 2 }} value={stageMode} exclusive size="small" onChange={handleStageModeChange}>
        <ToggleButton value={EStageMode.DRAG} aria-label="drag">
          <Tooltip title="拖拽">
            <OpenWith />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value={EStageMode.DRAW} aria-label="draw">
          <Tooltip title="绘图">
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
        区块类型
      </Typography>
      <ToggleButtonGroup sx={{ mb: 2 }} value={drawingType} exclusive size="small" onChange={handleDrawingTypeChange}>
        {/* <ToggleButton value={EDrawingType.RECT} aria-label="rect">
          <Tooltip title="矩形">{DrawingTypeIconMap[EDrawingType.RECT]}</Tooltip>
        </ToggleButton> */}
        <ToggleButton value={EDrawingType.POLYGON} aria-label="polygon">
          <Tooltip title="多边形">{DrawingTypeIconMap[EDrawingType.POLYGON]}</Tooltip>
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
  const renderDrawResult = () => (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        区块信息
      </Typography>
      <Box sx={{ bgcolor: 'background.paper', position: 'relative' }}>
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
              bgcolor: 'background.paper',
              zIndex: 1
            }}
            secondaryAction={<span>操作</span>}
          >
            <ListItemIcon>
              <span>类型</span>
            </ListItemIcon>
            <ListItemText primary="ID" />
          </ListItem>
          {drawResultList.map((drawResult) => (
            <ListItem
              key={drawResult.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(drawResult)}>
                  <Delete />
                </IconButton>
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
      </Box>
    </>
  )
  /* ---------------------------------- 绘制结果 ---------------------------------- */

  /* ---------------------------------- 新增区块 ---------------------------------- */
  const [addBlockDialogOpen, setAddBlockDialogOpen] = useState(false)
  // 当前绘制的坐标点
  const drawingResultSelectedPoints = useMemo(() => {
    if (newDrawingResult?.type === EDrawingType.RECT) {
      const rectData = newDrawingResult.data as TRectResult
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
    } else if (newDrawingResult?.type === EDrawingType.POLYGON) {
      return _.chunk(newDrawingResult.data as TPolygonResult, 2).map((p) => ({
        x: p[0] / stageMapRatio,
        y: p[1] / stageMapRatio
      }))
    }
    return []
  }, [newDrawingResult, stageMapRatio])
  useUpdateEffect(() => {
    newDrawingResult && setAddBlockDialogOpen(true)
  }, [newDrawingResult])
  const handleAddSubmit = useCallback<NonNullable<IAddBlockDialogProps['onSubmit']>>(
    async (values) => {
      const data = {
        ...values,
        points: drawingResultSelectedPoints
      }

      await createTrafficBlock(data)
      fetchTrafficBlock()
    },
    [drawingResultSelectedPoints, fetchTrafficBlock]
  )
  const handleAddBlockDialogClose = useCallback<NonNullable<IAddBlockDialogProps['onClose']>>(() => {
    setAddBlockDialogOpen(false)
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
      <AddBlockDialog
        open={addBlockDialogOpen}
        points={drawingResultSelectedPoints}
        onClose={handleAddBlockDialogClose}
        onSubmit={handleAddSubmit}
      />
    </>
  )
}

export default memo(DrawingBlockCard)
