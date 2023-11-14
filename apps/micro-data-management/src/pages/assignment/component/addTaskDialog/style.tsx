import styled from '@emotion/styled'

export const AddTaskDialogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: #16181c;
  height: 800px;
  box-sizing: border-box;
  .header {
    display: flex;
    gap: 12px;
    height: 720px;
    .task-list {
      width: 600px;
      height: 100%;
      border-radius: 2px;
      overflow: hidden;
    }
    .add-task-form {
      width: 300px;
      height: 100%;
      border-radius: 2px;
      overflow: hidden;
    }
  }
  .footer {
    height: 80px;
    margin-top: 12px;
    .count {
      display: flex;
      align-items: center;
      padding-left: 12px;
      color: #9ba0a6;
      font-size: 14px;
    }
  }
`

export const AddTaskFormWrapper = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    & > div,
    & > h6 {
      width: 100%;
    }
  }
`
