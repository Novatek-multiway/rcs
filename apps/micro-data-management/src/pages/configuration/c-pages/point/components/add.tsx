import { useRequest } from 'ahooks'
import { CreateStationInfos } from 'apis'
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
const AddDialog: React.FC<{
  open: boolean
  vertexData?: any
  carrierData?: any
  chassisList?: any
  onClose?: () => void
  callback?: () => void
}> = ({ open, onClose = () => {}, callback, vertexData = [], carrierData = [], chassisList = [] }) => {
  const { runAsync: run } = useRequest(CreateStationInfos, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const { dicts } = useDictStore()

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>添加站点</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={3}
          ref={formRef}
          defaultValue={{
            Angle: 0,
            AreaID: [],
            BackGroundColor: '',
            Carrier: 0,
            CarrierType: 0,
            DisPlayLength: 0,
            DisPlayModel: '',
            DisPlayWidth: 0,
            DisplayFontColor: '',
            DisplayName: '',
            HomeGroup: 0,
            HomeGroupPriority: 0,
            HomeGroupType: 0,
            ID: 0,
            Name: '',
            Number: 0,
            PointKey: 0,
            Priority: 0,
            State: 0,
            Type: 0,
            UsageCount: 0,
            WorkAreaTypeStr: ''
          }}
          schemaObject={[
            {
              name: 'PointKey',
              label: '路径编号',
              type: 'autoComplete',
              required: true,
              items: vertexData
              // type: "select",
            },
            {
              name: 'Carrier',
              label: '车号',
              type: 'select',
              items: carrierData
              // type: "select",
            },
            {
              name: 'CarrierType',
              label: '车型',
              type: 'select',
              items: chassisList
            },
            {
              name: 'Number',
              label: '车数',
              type: 'number'
            },
            {
              name: 'Priority',
              label: '优先级',
              type: 'number'
            },
            {
              name: 'Type',
              label: '站点类型',
              type: 'select',
              items: dicts['StationType']
            },
            {
              name: 'State',
              label: '状态',
              type: 'select',
              items: dicts['LocationState']
            },
            {
              name: 'Name',
              label: '名称',
              type: 'text'
            },
            {
              name: 'DisplayName',
              label: '显示名称',
              type: 'text'
            },
            {
              name: 'DisplayFontColor',
              label: '显示颜色',
              type: 'text'
            },
            {
              name: 'DisPlayWidth',
              label: '宽度',
              type: 'number'
            },
            {
              name: 'DisPlayLength',
              label: '长度',
              type: 'number'
            },
            {
              name: 'Angle',
              label: '角度',
              type: 'number'
            },
            {
              name: 'HomeGroup',
              label: '待命点分组',
              type: 'number'
            },
            {
              name: 'HomeGroupType',
              label: '待命点类型',
              type: 'number'
            },
            {
              name: 'HomeGroupPriority',
              label: '待命点优先级',
              type: 'number'
            },
            {
              name: 'BackGroundColor',
              label: '背景颜色',
              type: 'text'
            },
            {
              name: 'WorkAreaTypeStr',
              label: '标注',
              type: 'text'
            },
            {
              name: 'DisPlayModel',
              label: '模型',
              type: 'text'
            },
            {
              name: 'AreaID',
              label: '区域ID',
              type: 'autoComplete',
              multiple: true,
              items: vertexData
            }
          ]}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values } = formRef.current || {}
            console.log(values)

            if (isValid) {
              const sendData = {
                ...values,
                // Genus: 3,
                AreaID: values.AreaID.map((item) => Number(item.value)),
                PointKey: Number(values.PointKey.value),
                Type: Number(values.Type)
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
export default AddDialog
