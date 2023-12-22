import { useVoerkaI18n } from '@voerkai18n/react'
import { postCreateCarrier } from 'apis'
import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MaterialForm, nygFormik, useTheme } from 'ui'
import { dictsTransform } from 'utils'

const AddDialog: React.FC<{
  open: boolean
  chassisData: any
  areaInfosOptions: any[]
  onClose?: () => void
  callback?: () => void
}> = ({ open, chassisData = [], areaInfosOptions = [], onClose = () => {}, callback }) => {
  const { t } = useVoerkaI18n()
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)

  React.useEffect(() => {
    setTimeout(() => {
      formRef.current?.setFieldValue('area', [areaInfosOptions[0]])
    })
  }, [open, areaInfosOptions])

  const vehicleTypeOptions = React.useMemo(
    () =>
      dictsTransform(chassisData, 'model', 'id') as {
        label: string
        value: string
      }[],
    [chassisData]
  )

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('添加车辆配置信息')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={2}
          ref={formRef}
          schemaObject={[
            {
              name: 'ip',
              label: t('车辆IP'),
              type: 'text',
              required: true
            },
            {
              name: 'name',
              label: t('车体名称'),
              type: 'text',
              required: true
            },
            {
              name: 'id',
              label: t('车辆编号'),
              type: 'text',
              required: true
            },
            {
              name: 'chassisID',
              label: t('车辆类型'),
              type: 'select',
              items: vehicleTypeOptions,
              required: true
            },
            {
              name: 'area',
              label: t('车辆分组'),
              type: 'autoComplete',
              multiple: true,
              items: areaInfosOptions
            }
          ]}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef?.current?.submitForm()
            const { isValid, values }: any = formRef.current || {}

            if (isValid) {
              const params = {
                ...values,
                type: chassisData.find((item: any) => item.id + '' === values.chassisID)?.type
              }
              params.area = params?.area.map((obj: any) => Number(obj.value))
              await postCreateCarrier(params)
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
export default AddDialog
