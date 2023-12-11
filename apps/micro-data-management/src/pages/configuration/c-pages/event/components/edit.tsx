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
      label: '事件描述',
      type: 'text',
      required: true
      // type: "select",
    },
    {
      name: 'genus',
      label: '元素类型',
      type: 'select',
      items: dicts['GraphGenus'],
      onChange: (e: SelectChangeEvent) => {
        setCurrentGenus(e.target.value)
      }
      // type: "select",
    },
    {
      name: 'routeKey',
      label: '路径ID',
      type: 'autoComplete',
      items: routeKeyOptions
      // type: "select",
    },
    {
      name: 'carrierType',
      label: '车辆类型',
      type: 'select',
      items: chassisList
    },
    {
      name: 'doTime',
      label: '执行阶段',
      type: 'select',
      items: dicts['EventTime']
    },
    {
      name: 'waitTime',
      label: '等待阶段',
      type: 'select',
      items: dicts['EventTime']
    },

    {
      name: 'eventType',
      label: '事件类型',
      type: 'select',
      items: dicts['EventType']
    },
    {
      name: 'timeOut',
      label: '超时',
      type: 'number'
    },
    {
      name: 'delay',
      label: '延时',
      type: 'number'
    },
    {
      name: 'priority',
      label: '优先级',
      type: 'number'
    },
    {
      name: 'checkHasGoods',
      label: '载货判断',
      type: 'select',
      items: dicts['CheckGoods']
    }
  ]

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>修改事件</DialogTitle>
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
            console.log(values)

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
          保存
        </Button>
        <Button color="warning" onClick={onClose}>
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default memo(EditDialog)
