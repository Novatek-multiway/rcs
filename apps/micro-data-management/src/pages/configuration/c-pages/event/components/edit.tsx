import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { UpdateEvent } from 'apis'
import * as React from 'react'
import { memo } from 'react'
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
  SelectChangeEvent,
  useTheme
} from 'ui'
const EditDialog: React.FC<{
  open: boolean
  vertexData?: any
  edgesData?: any
  carrierData?: any
  chassisList?: any
  onClose?: () => void
  callback?: () => void
  row?: Record<string, any>
}> = ({ open, onClose = () => {}, callback, chassisList = [], vertexData = [], edgesData = [], row = {} }) => {
  const { t } = useVoerkaI18n()
  const { runAsync: run } = useRequest(UpdateEvent, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const { dicts } = useDictStore()
  const [currentGenus, setCurrentGenus] = React.useState(row.genus)
  const routeKeyOptions = React.useMemo(() => {
    if (currentGenus === 1) {
      return vertexData
    } else if (currentGenus === 2) {
      return edgesData
    }
    return []
  }, [currentGenus, vertexData, edgesData])
  const schemaObject = [
    {
      name: 'description',
      label: t('事件描述'),
      type: 'text',
      required: true
      // type: "select",
    },
    {
      name: 'genus',
      label: t('元素类型'),
      type: 'select',
      items: dicts['GraphGenus'],
      onChange: (e: SelectChangeEvent) => {
        setCurrentGenus(e.target.value)
      }
      // type: "select",
    },
    {
      name: 'routeKey',
      label: t('路径ID'),
      type: 'autoComplete',
      items: routeKeyOptions
      // type: "select",
    },
    {
      name: 'carrierType',
      label: t('车辆类型'),
      type: 'select',
      items: chassisList
    },
    {
      name: 'doTime',
      label: t('执行阶段'),
      type: 'select',
      items: dicts['EventTime']
    },
    {
      name: 'waitTime',
      label: t('等待阶段'),
      type: 'select',
      items: dicts['EventTime']
    },

    {
      name: 'eventType',
      label: t('事件类型'),
      type: 'select',
      items: dicts['EventType']
    },
    {
      name: 'timeOut',
      label: t('超时'),
      type: 'number',
      inputProps: {
        min: 0,
        onChange: (e: any) => {
          if (e.target.value < 0) e.target.value = 0
        }
      }
    },
    {
      name: 'delay',
      label: t('延时'),
      type: 'number',
      inputProps: {
        min: 0,
        onChange: (e: any) => {
          if (e.target.value < 0) e.target.value = 0
        }
      }
    },
    {
      name: 'priority',
      label: t('优先级'),
      type: 'number',
      inputProps: {
        min: 0,
        onChange: (e: any) => {
          if (e.target.value < 0) e.target.value = 0
        }
      }
    },
    {
      name: 'checkHasGoods',
      label: t('载货判断'),
      type: 'select',
      items: dicts['CheckGoods']
    }
  ]

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('修改事件')}</DialogTitle>
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
            routeKey: { value: Number(row.routeKey), label: row.routeKey }
          }}
          schemaObject={schemaObject}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values } = formRef.current
            schemaObject.map((item) => {
              if (item.type === 'select') {
                values[item.name] = Number(values[item.name])
              }
            })

            if (isValid) {
              const sendData = {
                ...values,
                routeKey: values.routeKey.value
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
export default memo(EditDialog)
