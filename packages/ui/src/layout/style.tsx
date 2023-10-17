import { Box, styled } from '@mui/material'

import MaoKenZhuYuanTi from './assets/fonts/MaoKenZhuYuanTi-MaokenZhuyuanTi-2.ttf'

interface ILayoutContentProps {
  children: React.ReactNode
  backgroundImage: string
}

export const StyledContentWrapper = styled(Box)(({ theme, backgroundImage }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(0, 2),
  background: `url(${backgroundImage})`
}))

export const LayoutWrapper: React.FC<ILayoutContentProps> = ({ children, backgroundImage }) => {
  return <StyledContentWrapper backgroundImage={backgroundImage}>{children}</StyledContentWrapper>
}
