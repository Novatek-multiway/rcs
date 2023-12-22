import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { updateCarrier } from 'apis'
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
const ConfigDialog: React.FC<{
  open: boolean
  onClose?: () => void
  callback?: () => void
  rows?: Record<string, any>
}> = ({ open, onClose = () => {}, callback, rows }) => {
  const { t } = useVoerkaI18n()
  const { runAsync: run } = useRequest(updateCarrier, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)

  console.log(rows)

  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>{t('待命点配置')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={1}
          ref={formRef}
          defaultValue={{ ...rows }}
          schemaObject={[
            {
              name: 'id',
              label: t('车辆编号'),
              disabled: true,
              type: 'number'
            },
            {
              name: 'reHomeWaitTime',
              label: t('空闲间隔'),
              endAdornment: 's',
              type: 'number'
            },
            {
              name: 'homePoint',
              label: t('待命点'),
              type: 'text'
            },
            {
              name: 'isAutoReHome',
              label: t('是否回待命点'),
              type: 'checkbox'
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
            if (isValid) {
              await run(values)
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
export default ConfigDialog
