import styled from '@emotion/styled'

export const VehicleStatusItemWrapper = styled.div<{
  dotColor: React.CSSProperties['color']
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    display: flex;
    align-items: flex-end;
    transform: translateX(-8px);
    padding-bottom: 6px;
    .value {
      font-size: 32px;
      line-height: 32px;
      font-weight: bold;
    }
    .unit {
      margin-left: 2px;
      font-size: 12px;
      font-weight: bold;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    .dot {
      margin-right: 10px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${(props) => props.dotColor};
    }
    .text {
      font-size: 14px;
      color: #afb0b0;
    }
  }
`
