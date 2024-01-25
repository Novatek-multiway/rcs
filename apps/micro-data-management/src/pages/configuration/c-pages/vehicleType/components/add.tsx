import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { CreateChassisInfos } from 'apis'
import * as React from 'react'
import { useDictStore } from 'store'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  //   FormikContext,
  MaterialForm,
  nygFormik,
  useTheme
} from 'ui'

import { VehicleTypeImageCommon } from '../common'
import { getVehicleImage } from '../utils'

const AddDialog: React.FC<{
  open: boolean
  onClose?: () => void
  callback?: () => void
}> = ({ open, onClose = () => {}, callback }) => {
  const { t } = useVoerkaI18n()
  const { runAsync: run } = useRequest(CreateChassisInfos, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const { dicts } = useDictStore()

  const [currentChassisModelUrl, setCurrentChassisModelUrl] = React.useState<string>()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('添加车型')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          ref={formRef}
          schemaObject={[
            {
              name: 'type',
              label: t('类型'),
              type: 'select',
              required: true,
              items: dicts['CarrierType']
              // type: "select",
            },
            {
              name: 'model',
              label: t('名称'),
              type: 'text',
              required: true
              // type: "select",
            },
            {
              name: 'x1',
              label: 'X1',
              type: 'number',
              required: true
            },
            {
              name: 'x2',
              label: 'X2',
              type: 'number',
              required: true
            },
            {
              name: 'y1',
              label: 'Y1',
              type: 'number',
              required: true
            },
            {
              name: 'y2',
              label: 'Y2',
              type: 'number',
              required: true
            },
            {
              name: 'forcedCharge',
              label: t('强制充电电量'),
              type: 'number',
              inputProps: {
                min: 0,
                onChange: (e: any) => {
                  if (e.target.value < 0) e.target.value = 0
                }
              }
            },
            {
              name: 'chassisModel',
              label: t('模型文件'),
              type: 'select',
              items: VehicleTypeImageCommon,
              onChange: async (e) => {
                const url = await getVehicleImage(e.target.value)
                setCurrentChassisModelUrl(url)
              }
            }
          ]}
        ></MaterialForm>
        <Grid container justifyContent={'center'}>
          {currentChassisModelUrl && (
            <img
              src={currentChassisModelUrl}
              style={{
                transform: 'rotate(90deg)',
                height: 100,
                objectFit: 'cover'
              }}
            />
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={onClose}>
          {t('取消')}
        </Button>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values } = formRef.current as any
            if (isValid) {
              const baseData = {
                brakingAcceleration: 300,
                freeSecond: 0,
                fullChargeDay: 7,
                id: 0,
                isControlFront: false,
                length: 100,
                maxAcc: 300,
                maxDec: 300,
                noLoadRadius: 0,
                noLoadSpeed: 3000,
                safeX: 10,
                safeY: 10,
                shutdown: 100,
                speedMax: 3000,
                timeOut: 10,
                type: 1,
                width: 100,
                noLoadLength: 0,
                noLoadOffsetX: 0,
                noLoadOffsetY: 0,
                noLoadWidth: 0
              }
              const sendData = {
                ...baseData,
                ...values,
                type: Number(values.type),
                forcedCharge: Number(values.forcedCharge),
                noLoadLength: -values.x1 + values.x2,
                noLoadWidth: -values.y1 + values.y2,
                noLoadOffsetX: (values.x1 + values.x2) / 2,
                noLoadOffsetY: (values.y1 + values.y2) / 2
              }

              await run(sendData)
              onClose()
              callback && callback()
            }
          }}
        >
          {t('保存')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default AddDialog
