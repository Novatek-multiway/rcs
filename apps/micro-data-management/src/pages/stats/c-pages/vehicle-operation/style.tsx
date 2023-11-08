import styled from '@emotion/styled'

export const VehicleOperationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0;
  height: 100%;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    .header,
    .footer {
      flex: 1;
      display: flex;
      gap: 12px;
      justify-content: space-between;
    }
  }
`
