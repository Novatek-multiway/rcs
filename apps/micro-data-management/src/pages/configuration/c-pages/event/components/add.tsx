import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { AddEvent } from 'apis'
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
  SelectChangeEvent,
  useTheme
} from 'ui'
const AddDialog: React.FC<{
  open: boolean
  vertexData?: any
  edgesData?: any
  carrierData?: any
  chassisList?: any
  onClose?: () => void
  callback?: () => void
}> = ({ open, onClose = () => {}, callback, chassisList = [], vertexData = [], edgesData = [] }) => {
  const { t } = useVoerkaI18n()
  const { runAsync: run } = useRequest(AddEvent, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const { dicts } = useDictStore()
  const [currentGenus, setCurrentGenus] = React.useState(dicts['GraphGenus']?.[0]?.value)
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
      required: true,
      label: t('事件描述'),
      type: 'text'
      // type: "select",
    },
    {
      name: 'genus',
      required: true,
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
      required: true,
      label: t('路径ID'),
      type: 'autoComplete',
      items: routeKeyOptions
      // type: "select",
    },
    {
      name: 'carrierType',
      required: true,
      label: t('车辆类型'),
      type: 'select',
      items: [{ label: t('全部'), value: 0 }].concat(...chassisList)
    },
    {
      name: 'doTime',
      required: true,
      label: t('执行阶段'),
      type: 'select',
      items: dicts['EventTime']
    },
    {
      name: 'waitTime',
      required: true,
      label: t('等待阶段'),
      type: 'select',
      items: dicts['EventTime']
    },

    {
      name: 'timeOut',
      required: true,
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
      required: true,
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
      required: true,
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
      required: true,
      label: t('载货判断'),
      type: 'select',
      items: dicts['CheckGoods']
    },
    {
      name: 'eventType',
      required: true,
      label: t('事件类型'),
      type: 'select',
      items: dicts['EventType']
    }
  ]

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('添加事件')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={3}
          ref={formRef}
          defaultValue={{
            genus: currentGenus,
            routeKey: routeKeyOptions[0],
            carrierType: 0,
            doTime: dicts['EventTime']?.[0]?.value,
            waitTime: dicts['EventTime']?.[0]?.value,
            timeOut: 0,
            delay: 0,
            priority: 0,
            checkHasGoods: dicts['CheckGoods']?.[1]?.value
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
      </DialogActions>
    </Dialog>
  )
}
export default AddDialog
