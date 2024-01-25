import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { AddRule } from 'apis'
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
import { toastWarn } from 'utils'
const AddDialog: React.FC<{
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
}> = ({ open, onClose = () => {}, callback, ruleCarrierData = [], controlStates = [], chargingPiles = [] }) => {
  const { t } = useVoerkaI18n()
  const { runAsync: run } = useRequest(AddRule, {
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
        endAdornment: (
          <InputAdornment
            position="start"
            sx={{
              '&::after': {
                content: '"—"',
                position: 'relative',
                left: '45px'
              }
            }}
          >
            h
          </InputAdornment>
        )
      },
      {
        name: 'startMinute',
        label: t('开始分钟'),
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
        endAdornment: (
          <InputAdornment
            position="start"
            sx={{
              '&::after': {
                content: '"—"',
                position: 'relative',
                left: '45px'
              }
            }}
          >
            h
          </InputAdornment>
        )
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

  return (
    <Dialog maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>{t('新增充电策略')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={2}
          ref={formRef}
          defaultValue={{
            completePercent: 95,
            completeTime: 1,
            completeType: 3,
            endHour: 24,
            endMinute: 0,
            level: 1,
            name: '',
            planName: '',
            priority: 1,
            startHour: 0,
            startMinute: 0,
            timeLimit: 1,
            minLimitBattery: 0,
            maxLimitBattery: 100
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
        <Button color="warning" onClick={onClose}>
          {t('取消')}
        </Button>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values } = formRef.current || {}

            if (isValid) {
              const hasCarrierKeys = !!values.carrierKeys && !!values.carrierKeys.length
              if (!hasCarrierKeys && !values.carrierType) {
                return toastWarn(t('“车辆编号与车辆类型必设置一个”（同时设置仅车辆编号生效）'))
              }

              const sendData = {
                ...values,
                // Genus: 3,
                carrierKeys: values.carrierKeys.join(','),
                pileKeys: values.pileKeys.map((item) => item.value).join(','),
                carrierType: hasCarrierKeys ? 0 : values.carrierType
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
