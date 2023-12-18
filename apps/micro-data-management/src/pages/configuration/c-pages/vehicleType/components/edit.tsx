import { useAsyncEffect, useRequest } from 'ahooks'
import { UpdateChassisInfos } from 'apis'
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
const EditDialog: React.FC<{
  open: boolean
  onClose?: () => void
  callback?: () => void
  row?: Record<string, any>
}> = ({ open, onClose = () => {}, callback, row }) => {
  const { runAsync: run } = useRequest(UpdateChassisInfos, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const { dicts } = useDictStore()

  const [currentChassisModelUrl, setCurrentChassisModelUrl] = React.useState<string>()
  useAsyncEffect(async () => {
    const url = await getVehicleImage(row?.chassisModel)
    setCurrentChassisModelUrl(url)
  }, [row?.chassisModel])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>修改车型</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          ref={formRef}
          defaultValue={row}
          schemaObject={[
            {
              name: 'type',
              label: '类型',
              type: 'select',
              required: true,
              items: dicts['CarrierType']
              // type: "select",
            },
            {
              name: 'model',
              label: '名称',
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
              label: '强制充电电量',
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
              label: '模型文件',
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
            <img src={currentChassisModelUrl} style={{ transform: 'rotate(90deg)', height: 100, objectFit: 'cover' }} />
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values } = formRef.current || {}
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
                ...(typeof values === 'object' ? values : {}),
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
          保存
        </Button>
        <Button color="warning" onClick={onClose}>
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default EditDialog
