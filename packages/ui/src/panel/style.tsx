import styled from '@emotion/styled'

export const PanelWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  .panel-title {
    font-size: 14px;
    font-weight: bold;
    padding: 4px 6px;
  }
`

export const PanelBackdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  transform: translate(4px, 4px);
  border: 1px solid #272f3c;
  background: transparent;
`

export const PanelContentWrapper = styled.div`
  flex: 1;
  position: relative;
  border: 1px solid #272f3c;
  background-color: rgba(0, 0, 0, 0.3);
`
