import { useVoerkaI18n } from '@voerkai18n/react'
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
  InputAdornment,
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
  const { t } = useVoerkaI18n()
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
        label: t('充电类型'),
        type: 'radioGroup',
        items: [
          {
            value: 3,
            label: t('时间')
          },
          {
            value: 1,
            label: t('百分比')
          }
        ],

        required: true
      },

      {
        name: 'name',
        label: t('策略名称'),
        type: 'text',
        required: true
      },
      {
        name: 'planName',
        label: t('计划名称'),
        type: 'text',
        required: true
        // type: "select",
      },

      {
        name: 'carrierKeys',
        label: t('车辆编号'),
        type: 'autoComplete',
        multiple: true,
        items: controlStates
      },
      {
        name: 'carrierType',
        label: t('车辆类型'),
        type: 'select',
        items: ruleCarrierData
      },
      {
        name: 'priority',
        label: t('任务优先级'),
        type: 'number',
        inputProps: {
          min: 0,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
          }
        }
      },
      {
        name: 'level',
        label: t('规则优先级'),
        type: 'number',
        inputProps: {
          min: 0,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
          }
        }
      },
      {
        name: 'startHour',
        label: t('开始小时'),
        type: 'number',
        inputProps: {
          min: 0,
          max: 24,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
            if (e.target.value > 24) e.target.value = 24
          }
        },
        endAdornment: <InputAdornment position="start">h</InputAdornment>
      },
      {
        name: 'endHour',
        label: t('结束小时'),
        type: 'number',
        inputProps: {
          min: 0,
          max: 24,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
            if (e.target.value > 24) e.target.value = 24
          }
        },
        endAdornment: <InputAdornment position="start">h</InputAdornment>
      },
      {
        name: 'startMinute',
        label: t('起始分钟'),
        type: 'number',
        inputProps: {
          min: 0,
          max: 59,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
            if (e.target.value > 59) e.target.value = 59
          }
        },
        endAdornment: <InputAdornment position="start">m</InputAdornment>
      },
      {
        name: 'endMinute',
        label: t('结束分钟'),
        type: 'number',
        inputProps: {
          min: 0,
          max: 59,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
            if (e.target.value > 59) e.target.value = 59
          }
        },
        endAdornment: <InputAdornment position="start">m</InputAdornment>
      },

      {
        name: 'minLimitBattery',
        label: t('低电量百分比'),
        type: 'number',
        inputProps: {
          min: 0,
          max: 100,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
            if (e.target.value > 100) e.target.value = 100
          }
        },
        endAdornment: <InputAdornment position="start">%</InputAdornment>
      },
      {
        name: 'maxLimitBattery',
        label: t('高电量百分比'),
        type: 'number',
        inputProps: {
          min: 0,
          max: 100,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
            if (e.target.value > 100) e.target.value = 100
          }
        },
        endAdornment: <InputAdornment position="start">%</InputAdornment>
      },
      {
        name: 'pileKeys',
        label: t('充电桩'),
        type: 'autoComplete',
        multiple: true,
        items: chargingPiles
      },
      {
        name: 'timeLimit',
        label: t('空闲时间'),
        type: 'number',
        inputProps: {
          min: 0,
          onChange: (e: any) => {
            if (e.target.value < 0) e.target.value = 0
          }
        },
        endAdornment: <InputAdornment position="start">m</InputAdornment>
      }
    ]

    const dynamicSchema =
      currentCompleteType === '3'
        ? {
            name: 'completeTime',
            label: t('充电时间'),
            type: 'number',
            required: true,
            inputProps: {
              min: 0,
              onChange: (e: any) => {
                if (e.target.value < 0) e.target.value = 0
              }
            },
            endAdornment: <InputAdornment position="start">m</InputAdornment>
          }
        : {
            name: 'completePercent',
            label: t('充电百分比'),
            type: 'number',
            required: true,
            inputProps: {
              min: 0,
              max: 100,
              onChange: (e: any) => {
                if (e.target.value < 0) e.target.value = 0
                if (e.target.value > 100) e.target.value = 100
              }
            },
            endAdornment: <InputAdornment position="start">%</InputAdornment>
          }
    commonSchema.splice(1, 0, dynamicSchema)
    return commonSchema
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCompleteType, chargingPiles, controlStates, ruleCarrierData])

  React.useEffect(() => {
    row?.completeType && setCurrentCompleteType(row?.completeType + '')
  }, [row?.completeType])

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('修改充电策略')}</DialogTitle>
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
          onFormValueChange={(e) => {
            const target = e.target as HTMLInputElement
            if (target.name === 'completeType') {
              const completeType = target.value

              setCurrentCompleteType(completeType)
            }
          }}
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
          {t('保存')}
        </Button>
        <Button color="warning" onClick={onClose}>
          {t('关闭')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default EditDialog
