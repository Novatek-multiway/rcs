import { Close, Delete, Draw, OpenWith, PentagonOutlined, RectangleOutlined } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import { useUpdateEffect } from 'ahooks'
import Konva from 'konva'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
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
import { EDrawingType, TRectResult, TResultWrapper } from '../../hooks/useKonvaDrawing'
import { useTwoDMapStore } from '../../store'
import { POINT_SIZE } from '../points/constant'
import AddBlockDialog from './AddBlockDialog'
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
    insidePoints,
    newDrawingResult
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
    insidePoints: state.insidePoints,
    newDrawingResult: state.newDrawingResult
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
        <ToggleButton value={EDrawingType.RECT} aria-label="rect">
          <Tooltip title="矩形">{DrawingTypeIconMap[EDrawingType.RECT]}</Tooltip>
        </ToggleButton>
        {/* <ToggleButton value={EDrawingType.POLYGON} aria-label="polygon">
          <Tooltip title="多边形">{DrawingTypeIconMap[EDrawingType.POLYGON]}</Tooltip>
        </ToggleButton> */}
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
  const handleDeleteClick = (drawResult: (typeof drawingResultListMap)[keyof typeof drawingResultListMap][0]) => {
    const newDrawingResultListMap = { ...drawingResultListMap }
    if (drawResult.type === EDrawingType.RECT) {
      const newDrawingResultList = newDrawingResultListMap[drawResult.type].filter((i) => i.id !== drawResult.id)
      newDrawingResultListMap[drawResult.type] = newDrawingResultList
    }
    setDrawingResultListMap(newDrawingResultListMap)
  }
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

  const handleSubmit = useCallback(() => {
    drawingResultListMap.rect.forEach((drawResult) => {
      const selected = insidePoints.filter((pointPosition) =>
        Konva.Util.haveIntersection(drawResult.data, { ...pointPosition, width: POINT_SIZE, height: POINT_SIZE })
      )
      console.log('🚀 ~ file: index.tsx ~ line 180 ~ drawingResultListMap.rect.forEach ~ selected', selected)
    })
  }, [insidePoints, drawingResultListMap])

  /* ---------------------------------- 新增区块 ---------------------------------- */
  const [addBlockDialogOpen, setAddBlockDialogOpen] = useState(false)
  const drawingResultSelectedPoints = useMemo(() => {
    if (newDrawingResult?.type === 'rect') {
      const selected = insidePoints.filter((pointPosition) =>
        Konva.Util.haveIntersection((newDrawingResult as TResultWrapper<TRectResult>).data, {
          ...pointPosition,
          width: POINT_SIZE,
          height: POINT_SIZE
        })
      )
      return selected
    }
    return []
  }, [newDrawingResult, insidePoints])
  useUpdateEffect(() => {
    setAddBlockDialogOpen(true)
  }, [newDrawingResult])
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
          <CardActions
            sx={{
              justifyContent: 'flex-end'
            }}
          >
            <Button size="small" onClick={handleSubmit}>
              提交
            </Button>
            <Button size="small" color="inherit" onClick={handleClose}>
              取消
            </Button>
          </CardActions>
        </Card>
      </DrawingBlockCardWrapper>
      <AddBlockDialog
        open={addBlockDialogOpen}
        points={drawingResultSelectedPoints}
        onClose={() => {
          setAddBlockDialogOpen(false)
        }}
      />
    </>
  )
}

export default memo(DrawingBlockCard)
