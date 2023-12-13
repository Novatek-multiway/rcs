import { useRequest } from 'ahooks'
import { UpdateRule } from 'apis'
import * as React from 'react'
// import { useDictStore } from "store";
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
  vertexData?: any
  carrierData?: any
  chassisList?: any
  onClose?: () => void
  callback?: () => void
  ruleCarrierData?: any
  carrierOptionsData?: any
  controlStates?: any
  chargingPiles?: any
  row?: Record<string, any>
}> = ({
  open,
  onClose = () => {},
  callback,
  ruleCarrierData = [],
  controlStates = [],
  chargingPiles = [],
  row = {}
}) => {
  const { runAsync: run } = useRequest(UpdateRule, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)

  const [currentCompleteType, setCurrentCompleteType] = React.useState('3')
  const schemaObject = React.useMemo(() => {
    const commonSchema = [
      {
        name: 'completeType',
        label: '充电类型',
        type: 'radioGroup',
        items: [
          {
            value: 3,
            label: '时间'
          },
          {
            value: 1,
            label: '百分比'
          }
        ],
        required: true
      },

      {
        name: 'name',
        label: '策略名称',
        type: 'text',
        required: true
      },
      {
        name: 'planName',
        label: '计划名称',
        type: 'text',
        required: true
        // type: "select",
      },

      {
        name: 'carrierKeys',
        label: '车辆编号',
        type: 'autoComplete',
        multiple: true,
        items: controlStates
      },
      {
        name: 'carrierType',
        label: '车辆类型',
        type: 'select',
        items: ruleCarrierData,
        required: true
      },
      {
        name: 'priority',
        label: '任务优先级',
        type: 'number'
      },
      {
        name: 'level',
        label: '规则优先级',
        type: 'number'
      },
      {
        name: 'startHour',
        label: '开始小时',
        type: 'number'
      },
      {
        name: 'endHour',
        label: '结束小时',
        type: 'number'
      },
      {
        name: 'startMinute',
        label: '起始分钟',
        type: 'number'
      },
      {
        name: 'endMinute',
        label: '结束分钟',
        type: 'number'
      },

      {
        name: 'minLimitBattery',
        label: '低电量百分比',
        type: 'number'
      },
      {
        name: 'maxLimitBattery',
        label: '高电量百分比',
        type: 'number'
      },
      {
        name: 'pileKeys',
        label: '充电桩',
        type: 'autoComplete',
        multiple: true,
        items: chargingPiles
      },
      {
        name: 'timeLimit',
        label: '空闲时间',
        type: 'number'
      }
    ]
    const dynamicSchema =
      currentCompleteType === '3'
        ? {
            name: 'completeTime',
            label: '充电时间',
            type: 'number',
            required: true
          }
        : {
            name: 'completePercent',
            label: '充电百分比',
            type: 'number',
            required: true
          }
    commonSchema.splice(1, 0, dynamicSchema)
    return commonSchema
  }, [currentCompleteType, chargingPiles, controlStates, ruleCarrierData])

  React.useEffect(() => {
    row?.completeType && setCurrentCompleteType(row?.completeType + '')
  }, [row?.completeType])

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>修改充电策略</DialogTitle>
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
            carrierKeys: row?.carrierKeys?.split(','),
            pileKeys: chargingPiles.filter((p: any) => row?.pileKeys?.split(',').includes(p.label))
          }}
          onFormValueChange={(e) => setCurrentCompleteType((e.target as any).value)}
          schemaObject={schemaObject}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values } = formRef.current || {}
            if (isValid) {
              const sendData = {
                ...values,
                // Genus: 3,
                carrierKeys: values.carrierKeys.join(','),
                pileKeys: values.pileKeys.map((item) => item.value).join(','),
                completeType: Number(values.completeType),
                carrierType: Number(values.carrierType)
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
