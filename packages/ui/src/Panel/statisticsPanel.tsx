import type { BoxProps } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { animated, AnimationProps, useSpring } from '@react-spring/web'
import { FC, memo, ReactNode } from 'react'

interface PanelProps extends BoxProps {
  title: string
  action?: ReactNode
  animateConfig?: AnimationProps // 设计动画
}

const StyledBox = styled(animated(Box))(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  color: theme.palette.primary.main,
  padding: theme.spacing(2),
  backdropFilter: `blur(${theme.spacing(0.25)})`,
  webkitBackdropFilter: `blur(${theme.spacing(1)})`,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: 'rgba(142, 142, 142, 0.19) 0px 6px 15px 0px',
  borderRadius: theme.shape.borderRadius
}))

const StyleHeader = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderBottom: '1px solid rgba(255,255,255,0.3)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}))
const Panel: FC<PanelProps> = (props) => {
  const { title = '', children, animateConfig, action, ...rect } = props
  const animate = useSpring({
    from: { opacity: 0, transform: 'translateY(100%)' },
    to: {
      opacity: 1,
      transform: 'translateY(0%)'
    },
    config: { tension: 300, friction: 60 },
    delay: 100,
    ...animateConfig
  })
  return (
    <StyledBox style={animate} {...rect}>
      <StyleHeader>
        <Typography variant="h6">{title}</Typography>
        {action}
      </StyleHeader>
      {children}
    </StyledBox>
  )
}

export default memo(Panel)
