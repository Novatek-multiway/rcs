import styled from '@emotion/styled'

export const ElectricityWrapper = styled.div<{ itemFontSize?: string }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
  .stats-card {
    display: flex;
    gap: 8px;
    height: 75px;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #1d1e25;
      border-radius: 5px;
      font-size: ${(props) => props.itemFontSize || '16px'};
      text-align: center;
      .value {
        font-size: 24px;
        font-weight: bold;
      }
      .label {
        color: #919293;
      }
    }
  }
  .chart {
    flex: 1;
    min-height: 0;
    background-color: #1d1e25;
    border-radius: 5px;
  }
`
