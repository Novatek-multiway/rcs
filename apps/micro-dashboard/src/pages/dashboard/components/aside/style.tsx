import styled from '@emotion/styled'
import { animated } from '@react-spring/web'

const AsideBase = styled(animated.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 25vw;
`

export const AsideLeftWrapper = styled(AsideBase)`
  left: 0;
`

export const AsideRightWrapper = styled(AsideBase)`
  right: 0;
`
