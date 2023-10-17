import { styled } from '@mui/material'
import type { FC, ReactNode } from 'react'
import React, { memo, useEffect, useMemo, useState } from 'react'

import { MaterialIcons } from '../mui'
import { SPanel } from '.'

interface IDetailPanelProps {
  title?: string
  detail?: Record<string, any>
  open?: boolean
  onClose?: () => void
  children?: ReactNode
}

const DetailPanelWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(3),
  top: theme.spacing(10),
  fontSize: theme.spacing(1.8),
  '.attribute-list': {
    padding: theme.spacing(2),
    maxHeight: '65vh',
    overflowY: 'auto',
    '.attribute-item': {
      display: 'flex',
      alignItems: 'center',
      margin: `${theme.spacing(0.8)} 0`,
      '&-key': {
        minWidth: theme.spacing(10),
        marginRight: theme.spacing(3),
        color: theme.palette.text.primary,
        fontSize: theme.spacing(1.6)
      },
      '&-value': {
        flex: 1,
        padding: `${theme.spacing(0.8)} ${theme.spacing(3)}`,
        textAlign: 'center',
        background: 'rgba(92, 92, 92, 0.5)',
        minHeight: theme.spacing(2)
      }
    }
  }
}))

const DetailPanel: FC<IDetailPanelProps> = (props) => {
  const { title = '详情', detail = {}, open, onClose } = props
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)

  const attributeList = useMemo(() => Object.entries(detail), [detail])

  useEffect(() => {
    setDetailPanelOpen(!!open)
  }, [open])

  return (
    detailPanelOpen && (
      <DetailPanelWrapper>
        <SPanel
          title={title}
          action={
            <MaterialIcons.CloseRounded
              onClick={() => {
                if (onClose) onClose()
                else setDetailPanelOpen(false)
              }}
            >
              关闭
            </MaterialIcons.CloseRounded>
          }
        >
          <div className="attribute-list">
            {attributeList.map((attributeItem, index) => (
              <div className="attribute-item" key={index}>
                <div className="attribute-item-key">{attributeItem[0]}</div>
                <div className="attribute-item-value">{attributeItem[1] + ''}</div>
              </div>
            ))}
          </div>
        </SPanel>
      </DetailPanelWrapper>
    )
  )
}

export default memo(DetailPanel)
