import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import React from 'react'

// 修改LinearProgress主题色
const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  '&.MuiLinearProgress-root': {
    backgroundColor: '#00ffff' // 使用 theme.palette.primary.main 替换空字符串
  },
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: theme.palette.primary.main
  }
}))

const StyledBox = styled(Box)({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  // 设置背景颜色，黑色，透明度0.3
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
  color: '#fff',
  fontSize: '1.5rem',
  animation: 'pulse 1.5s infinite',
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 0.4
    },
    '50%': {
      opacity: 1
    }
  }
}))

const PageLoading = () => {
  return (
    <>
      <StyledLinearProgress color="primary" />
      <StyledBox>
        <Div>'加载中...'</Div>
      </StyledBox>
    </>
  )
}
export default PageLoading
