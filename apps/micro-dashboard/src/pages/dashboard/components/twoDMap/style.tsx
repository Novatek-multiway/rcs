import styled from '@emotion/styled'
import { animated } from '@react-spring/web'

export const TwoDMapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .cursor-position {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 16px;
    border-radius: 5px;
    color: white;
    background-color: #181a21;
    font-size: 14px;
  }
  .measuring-scale {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    span {
      position: absolute;
      bottom: 60%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
    }
  }
`

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
