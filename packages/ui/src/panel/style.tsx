import styled from '@emotion/styled'

const inset = '4px'
export const PanelWrapper = styled.div`
  --inset: ${inset};
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;
  .panel-title {
    font-size: 13px;
    font-weight: bold;
    padding: 4px 6px;
  }
`

export const PanelBackdrop = styled.div`
  --inset: ${inset};
  position: absolute;
  inset: 0;
  /* z-index: -1; */
  transform: translate(var(--inset), var(--inset));
  border: 1px solid #272f3c;
  background: transparent;
  clip-path: polygon(
    0 100%,
    0 calc(100% - var(--inset)),
    calc(100% - var(--inset)) calc(100% - var(--inset)),
    calc(100% - var(--inset)) 0,
    100% 0,
    100% 100%
  );
`

export const PanelContentWrapper = styled.div`
  --decoration-color: #718cbc;
  --decoration-width: 2px;
  flex: 1;
  position: relative;
  border: 1px solid #272f3c;
  background-origin: content-box;
  background-color: rgba(0, 0, 0, 0.8);
  background-image: linear-gradient(
      var(--decoration-color) var(--decoration-width),
      transparent var(--decoration-width),
      transparent calc(100% - var(--decoration-width)),
      var(--decoration-color) calc(100% - var(--decoration-width)),
      var(--decoration-color) 100%
    ),
    linear-gradient(
      90deg,
      var(--decoration-color) var(--decoration-width),
      transparent var(--decoration-width),
      transparent calc(100% - var(--decoration-width)),
      var(--decoration-color) calc(100% - var(--decoration-width)),
      var(--decoration-color) 100%
    ),
    linear-gradient(
      var(--decoration-color) var(--decoration-width),
      transparent var(--decoration-width),
      transparent calc(100% - var(--decoration-width)),
      var(--decoration-color) calc(100% - var(--decoration-width)),
      var(--decoration-color) 100%
    ),
    linear-gradient(
      90deg,
      var(--decoration-color) var(--decoration-width),
      transparent var(--decoration-width),
      transparent calc(100% - var(--decoration-width)),
      var(--decoration-color) calc(100% - var(--decoration-width)),
      var(--decoration-color) 100%
    );
  background-repeat: no-repeat;
  background-position: top left, top left, bottom right, bottom right;
  background-size: 6px 100%, 100% 6px;
  .panel-content {
    padding: 6px;
    height: 100%;
    box-sizing: border-box;
  }
`
