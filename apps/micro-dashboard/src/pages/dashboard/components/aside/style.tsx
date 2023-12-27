import styled from '@emotion/styled'
import { animated } from '@react-spring/web'

const AsideBase = styled(animated.div)<{ asideWidth?: string }>`
  position: absolute;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${(props) => props.asideWidth || '18.75vw'};
  min-width: 300px;
`

export const AsideLeftWrapper = styled(AsideBase)`
  left: 0;
`

export const AsideRightWrapper = styled(AsideBase)`
  right: 0;
`
