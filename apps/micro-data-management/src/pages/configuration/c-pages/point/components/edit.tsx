import { useRequest } from 'ahooks'
import { UpdateStationInfos } from 'apis'
import * as React from 'react'
import { useDictStore } from 'store'
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
import { toastWarn } from 'utils'
const EditDialog: React.FC<{
  open: boolean
  areaInfos?: any
  vertexData?: any
  carrierData?: any
  chassisList?: any
  onClose?: () => void
  callback?: () => void
  row?: Record<string, any>
}> = ({ open, onClose = () => {}, callback, areaInfos = [], vertexData = [], chassisList = [], row = {} }) => {
  const { runAsync: run } = useRequest(UpdateStationInfos, {
    manual: true
  })

  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const { dicts } = useDictStore()

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>编辑站点</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={3}
          ref={formRef}
          defaultValue={{
            ...row,
            PointKey: {
              label: String(row.PointKey),
              value: String(row.PointKey)
            },
            AreaID: areaInfos.filter((a: any) => row?.AreaID?.includes(a.value))
          }}
          schemaObject={[
            {
              name: 'PointKey',
              label: '路径编号',
              type: 'autoComplete',
              items: vertexData
              // type: "select",
            },
            {
              name: 'Priority',
              label: '优先级',
              type: 'number',
              inputProps: {
                min: 0,
                onChange: (e: any) => {
                  if (e.target.value < 0) e.target.value = 0
                }
              }
            },

            {
              name: 'Type',
              label: '站点类型',
              type: 'select',
              items: dicts['StationType']
            },
            {
              name: 'AreaID',
              label: '区域',
              type: 'autoComplete',
              multiple: true,
              items: areaInfos
            },
            {
              name: 'CarrierType',
              label: '车辆类型',
              type: 'select',
              items: [{ label: '全部', value: 0 }].concat(...chassisList)
            },

            {
              name: 'Name',
              label: '名称',
              type: 'text'
            }
            // {
            //   name: 'HomeGroup',
            //   label: '待命点分组',
            //   type: 'number'
            // },
            // {
            //   name: 'HomeGroupType',
            //   label: '待命点类型',
            //   type: 'number'
            // },
            // {
            //   name: 'HomeGroupPriority',
            //   label: '待命点优先级',
            //   type: 'number'
            // }
          ]}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values, errors } = formRef.current || {}
            if ((errors as Record<string, string>)['PointKey']) {
              toastWarn('请输入路径编号')
            }

            if (isValid) {
              const sendData = {
                ...values,
                UsageCount: 0,
                AreaID: values.AreaID.map((item) => Number(item.value)),
                PointKey: Number(values.PointKey.value),

                Type: Number(values.Type),
                Carrier: Number(values.Carrier),
                CarrierType: Number(values.CarrierType)
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
