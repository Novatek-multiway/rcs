import styled from '@emotion/styled'

export const TaskStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .header {
    display: flex;
    height: 48px;
    border-bottom: 1px solid #494a4d;
    & > div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      font-weight: bold;
      color: #fefefe;
      vertical-align: middle;
      span {
        padding: 0 4px;
        transform: translateY(-2px);
        font-size: 30px;
        line-height: 30px;
      }
    }
    .finished {
      span {
        color: #00c6c7;
      }
    }
    .unfinished {
      span {
        color: #919292;
      }
    }
  }
`
