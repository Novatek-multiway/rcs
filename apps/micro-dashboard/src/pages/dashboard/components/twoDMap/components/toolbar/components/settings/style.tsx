import styled from '@emotion/styled'
import { animated } from '@react-spring/web'

export const SettingsWrapper = styled(animated.div)<{ settingWidth?: string }>`
  position: fixed;
  bottom: 0;
  left: 1vw;
  width: ${(props) => props.settingWidth ?? '70vw'};
  height: fit-content;
  color: #fff;
  .header {
    position: absolute;
    right: 12px;
    top: 12px;
    display: flex;
    justify-content: flex-end;
  }
  .settings-content {
    display: flex;
    align-items: center;
    padding: 12px 36px;
    padding-right: 12px;
    .switches {
      flex: 7;
      display: flex;
      flex-wrap: wrap;
      & > div {
        display: flex;
        align-items: center;
        gap: 2px;
        width: 25%;
        font-size: 12px;
      }
    }
    .lines {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 10px;
      border-left: 3px solid #242731;
      border-right: 3px solid #242731;
      font-size: 12px;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 12px;
        width: 100%;
        .label {
          flex: 1;
          margin-right: 8px;
          text-align: center;
        }
        .marker {
          width: 48px;
          height: 8px;
        }
      }
    }
    .lights {
      flex: 3.5;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 2%;

      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
        font-size: 12px;
        span {
          flex: 1;
          text-align: right;
        }
        img {
          width: 54px;
        }
      }
    }
  }
`
