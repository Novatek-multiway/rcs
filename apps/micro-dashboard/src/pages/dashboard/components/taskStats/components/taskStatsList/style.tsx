import styled from '@emotion/styled'

export const TaskStatsItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 12px 0 12px 12px;
  box-sizing: border-box;
  .vehicle-id {
    font-size: 14px;
    padding: 4px 0;
  }
  section {
    display: flex;
    justify-content: center;
    gap: 16px;
    font-size: 13px;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 80px;
      padding-top: 6px;
      & > div {
        white-space: nowrap;
        .value {
          font-size: 20px;
          padding-right: 3px;
        }
      }
      &.finished {
        .value {
          color: #00c6c7;
        }
      }
      &.time {
        .value {
          color: #517cc8;
        }
      }
      &.average {
        .value {
          color: #f8f60b;
        }
      }
    }
  }
`
