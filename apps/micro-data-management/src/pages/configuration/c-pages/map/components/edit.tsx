import { useRequest } from 'ahooks'
import { message } from 'antd'
import { UpdateRouteFileInfo } from 'apis'
import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  //   FormikContext,
  MaterialForm,
  nygFormik,
  useTheme
} from 'ui'

const EditDialog: React.FC<{
  open: boolean
  carrierData?: any
  controlStates?: any
  onClose?: () => void
  callback?: () => void
  row?: Record<string, any>
}> = ({ open, onClose = () => {}, callback, carrierData = [], controlStates = [], row = {} }) => {
  const { runAsync: run } = useRequest(UpdateRouteFileInfo, {
    manual: true
  })

  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const schemaObject = [
    {
      name: 'projectName',
      label: '项目名称',
      type: 'text'

      // type: "select",
    },
    {
      name: 'routeName',
      label: '地图名称',
      type: 'text'
    },
    {
      name: 'guid',
      label: '地图GUID',
      type: 'text'
    },
    {
      name: 'revision',
      label: '版本号',
      type: 'number'
    },
    {
      name: 'mapChassis',
      label: '适用车辆',
      type: 'select',
      items: controlStates
    },
    {
      name: 'mapCarrier',
      label: '适用车型',
      type: 'select',
      items: carrierData
    },
    {
      name: 'dwgMinX',
      label: '地图XMin',
      type: 'number',
      disabled: true
    },
    {
      name: 'dwgMaxX',
      label: '地图XMax',
      type: 'number',
      disabled: true
    },
    {
      name: 'dwgMinY',
      label: '地图YMin',
      type: 'number',
      disabled: true
    },
    {
      name: 'dwgMaxY',
      label: '地图YMax',
      type: 'number',
      disabled: true
    },
    {
      name: 'dwgScale',
      label: '地图缩放',
      type: 'number',
      disabled: true
    },
    {
      name: 'routeMinX',
      label: '路径Xmin',
      type: 'number',
      disabled: true
    },
    {
      name: 'routeMaxX',
      label: '路径XMax',
      type: 'number',
      disabled: true
    },
    {
      name: 'routeMinY',
      label: '路径YMin',
      type: 'number',
      disabled: true
    },
    {
      name: 'routeMaxY',
      label: '路径YMax',
      type: 'number',
      disabled: true
    }
  ]

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>新增路径文件</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm columns={3} ref={formRef} defaultValue={row} schemaObject={schemaObject}></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values } = formRef.current

            if (isValid) {
              const sendData = {
                ...values
              }
              const res = await run(sendData)
              if (res.code === 0) {
                callback && callback()
                message.success(res.msg)
              } else {
                message.error(res.msg)
              }
              onClose()
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
