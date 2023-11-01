import styled from '@emotion/styled'
import { animated } from '@react-spring/web'

export const ToolbarWrapper = styled(animated.div)`
  position: absolute;
  z-index: 10;
  right: 0px;
  bottom: 12px;
  width: 32px;
  height: fit-content;
  display: flex;
  flex-direction: column;
`
