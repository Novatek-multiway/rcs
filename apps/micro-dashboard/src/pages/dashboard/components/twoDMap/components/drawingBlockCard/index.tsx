import { Close, Delete, Draw, OpenWith, PentagonOutlined, RectangleOutlined } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback } from 'react'
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
import { EDrawingType } from '../../hooks/useKonvaDrawing'
import { useTwoDMapStore } from '../../store'
import { DrawingBlockCardWrapper } from './style'

interface IDrawingBlockCardProps {}

const DrawingBlockCard: FC<PropsWithChildren<IDrawingBlockCardProps>> = () => {
  const { isDrawingBlockCardOpen, setIsDrawingBlockCardOpen, stageMode, setStageMode, drawingType, setDrawingType } =
    useTwoDMapStore((state) => ({
      isDrawingBlockCardOpen: state.isDrawingBlockCardOpen,
      setIsDrawingBlockCardOpen: state.setIsDrawingBlockCardOpen,
      stageMode: state.stageMode,
      setStageMode: state.setStageMode,
      drawingType: state.drawingType,
      setDrawingType: state.setDrawingType
    }))

  const drawingBlockCardSprings = useSpring({
    right: isDrawingBlockCardOpen ? 24 : -324
  })

  const handleClose = useCallback(() => {
    setIsDrawingBlockCardOpen(false)
  }, [setIsDrawingBlockCardOpen])

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
        绘图类型
      </Typography>
      <ToggleButtonGroup sx={{ mb: 2 }} value={drawingType} exclusive size="small" onChange={handleDrawingTypeChange}>
        <ToggleButton value={EDrawingType.RECT} aria-label="rect">
          <Tooltip title="矩形">
            <RectangleOutlined />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value={EDrawingType.POLYGON} aria-label="polygon">
          <Tooltip title="多边形">
            <PentagonOutlined />
          </Tooltip>
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
  const renderDrawResult = () => (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary">
        绘图结果
      </Typography>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <List>
          <ListItem secondaryAction={<span>操作</span>}>
            <ListItemIcon>
              <span>类型</span>
            </ListItemIcon>
            <ListItemText primary="ID" />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <Delete />
              </IconButton>
            }
            sx={{
              ':hover': {
                bgcolor: 'gray'
              }
            }}
          >
            <ListItemIcon>
              <Draw />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <Delete />
              </IconButton>
            }
            sx={{
              ':hover': {
                bgcolor: 'gray'
              }
            }}
          >
            <ListItemIcon>
              <RectangleOutlined />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </Box>
    </>
  )
  /* ---------------------------------- 绘制结果 ---------------------------------- */

  return (
    <DrawingBlockCardWrapper style={drawingBlockCardSprings}>
      <Card>
        <CardContent sx={{ gap: 10 }}>
          <Button disableRipple sx={{ position: 'absolute', right: 6, top: 6 }} onClick={handleClose}>
            <Close />
          </Button>
          {renderStageMode()}
          {stageMode === EStageMode.DRAW && (
            <>
              {renderDrawingType()}
              {renderDrawResult()}
            </>
          )}
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end'
          }}
        >
          <Button size="small">提交</Button>
          <Button size="small" color="inherit" onClick={handleClose}>
            取消
          </Button>
        </CardActions>
      </Card>
    </DrawingBlockCardWrapper>
  )
}

export default memo(DrawingBlockCard)
