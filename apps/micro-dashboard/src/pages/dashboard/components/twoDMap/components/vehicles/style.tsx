import styled from '@emotion/styled'

export const TooltipWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  transform: translate(6px, -65%);
  background-color: rgba(50, 60, 68, 0.5);
  border-radius: 1px;
  touch-action: none;
  pointer-events: none;
  user-select: none;
  .tooltip {
    padding: 2px 4px;
    border: 1px solid rgb(19, 20, 21);
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      left: -2px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 1px;
      background: #000;
    }

    &::after {
      content: '';
      position: absolute;
      left: -4px;
      top: calc(50% + 1px);
      transform: translateY(-50%) rotateZ(-45deg);
      width: 3px;
      height: 1px;
      background: #000;
    }

    & > div {
      display: flex;
      justify-content: space-between;
      min-width: 32px;
    }
  }
`
