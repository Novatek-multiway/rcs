import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { UpLoadDxfMap } from 'apis'
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

interface Props {
  open: boolean
  onClose?: () => void
  callback?: () => void
}

const ImportDialog = ({ open, onClose = () => {}, callback }: Props) => {
  const { t } = useVoerkaI18n()
  const [sendFile, setSendFile] = React.useState<{
    dxf: any
    filename: string
  }>({})
  const { runAsync: run } = useRequest(UpLoadDxfMap, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const schemaObject = [
    {
      name: 'description',
      label: t('路径数据文件'),
      onChange: async (event) => {
        const file = event.currentTarget.files[0]
        const render = new FileReader()
        render.readAsDataURL(file)
        render.onload = async () => {
          setSendFile({
            dxf: render.result,
            filename: file.name
          })
        }
      },
      type: 'file'
      // type: "select",
    }
  ]

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('上传文件')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm columns={1} ref={formRef} defaultValue={{}} schemaObject={schemaObject}></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={onClose}>
          {t('取消')}
        </Button>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()

            const sendData = {
              ...sendFile
            }
            const res = await run(sendData)
            console.log(res)
            if (res.code === 0) {
              callback && callback()
              message.success(res.msg)
            } else {
              message.error(res.msg)
            }
            onClose()
          }}
        >
          {t('保存')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ImportDialog
