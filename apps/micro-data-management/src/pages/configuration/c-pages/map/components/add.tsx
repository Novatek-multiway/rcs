import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { GetRouteFileInfo, WriteRouteFileInfo } from 'apis'
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
import { toastWarn } from 'utils'

const AddDialog: React.FC<{
  open: boolean
  carrierData?: any
  controlStates?: any
  onClose?: () => void
  callback?: () => void
}> = ({ open, onClose = () => {}, callback, carrierData = [], controlStates = [] }) => {
  const { t } = useVoerkaI18n()
  const [sendFile, setSendFile] = React.useState<{
    fileContent: any
    fileName: string
  }>({})

  const { runAsync: run } = useRequest(WriteRouteFileInfo, {
    manual: true
  })
  const { runAsync: routeFile } = useRequest(GetRouteFileInfo, {
    manual: true,
    onSuccess: (data) => {
      if (data) {
        // setInitValue(data.data);
        formRef.current.setValues({
          ...data.data,
          routeFile: data.data.fileName || ''
        })
      }
    }
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const schemaObject = [
    {
      name: 'description',
      label: t('路径数据文件'),
      onChange: async (event) => {
        if (!event.currentTarget.files.length) {
          setSendFile({
            fileContent: null,
            fileName: ''
          })
          formRef.current?.resetForm()

          return
        }
        const file = event.currentTarget.files[0]
        const render = new FileReader()
        render.readAsDataURL(file)
        render.onload = async () => {
          setSendFile({
            fileContent: render.result,
            fileName: file.name
          })
          await routeFile({
            fileContent: render.result,
            fileName: file.name
          })
        }
      },
      placeholder: t('请选择'),
      type: 'file',
      accept: '.zar'
      // type: "select",
    },
    {
      name: 'projectName',
      label: t('项目名称'),
      type: 'text'

      // type: "select",
    },
    {
      name: 'routeName',
      label: t('地图名称'),
      type: 'text'
    },
    {
      name: 'guid',
      label: t('地图GUID'),
      type: 'text'
    },
    {
      name: 'revision',
      label: t('版本号'),
      type: 'number',
      inputProps: {
        min: 0,
        onChange: (e: any) => {
          if (e.target.value < 0) e.target.value = 0
        }
      }
    },
    {
      name: 'mapChassis',
      label: t('适用车辆'),
      type: 'select',
      items: controlStates
    },
    {
      name: 'mapCarrier',
      label: t('适用车型'),
      type: 'select',
      items: carrierData
    },
    {
      name: 'dwgMinX',
      label: t('地图XMin'),
      type: 'number',
      disabled: true
    },
    {
      name: 'dwgMaxX',
      label: t('地图XMax'),
      type: 'number',
      disabled: true
    },
    {
      name: 'dwgMinY',
      label: t('地图YMin'),
      type: 'number',
      disabled: true
    },
    {
      name: 'dwgMaxY',
      label: t('地图YMax'),
      type: 'number',
      disabled: true
    },
    {
      name: 'dwgScale',
      label: t('地图缩放'),
      type: 'number',
      disabled: true
    },
    {
      name: 'routeMinX',
      label: t('路径Xmin'),
      type: 'number',
      disabled: true
    },
    {
      name: 'routeMaxX',
      label: t('路径XMax'),
      type: 'number',
      disabled: true
    },
    {
      name: 'routeMinY',
      label: t('路径YMin'),
      type: 'number',
      disabled: true
    },
    {
      name: 'routeMaxY',
      label: t('路径YMax'),
      type: 'number',
      disabled: true
    }
  ]

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('新增路径文件')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={3}
          ref={formRef}
          defaultValue={{
            mapChassis: 0,
            mapCarrier: 0
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
            const { isValid, values, errors } = formRef.current
            if (!sendFile.fileContent) return toastWarn(t('请选择路径数据文件'))

            if (errors[''])
              schemaObject.map((item) => {
                if (item.type === 'select') {
                  values[item.name] = Number(values[item.name])
                }
              })
            if (isValid) {
              const sendData = {
                ...values,
                id: 0,
                ...sendFile,
                routeFile: sendFile.fileName
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
          {t('保存')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default AddDialog
