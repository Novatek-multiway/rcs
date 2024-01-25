import { useVoerkaI18n } from '@voerkai18n/react'
import { postUpdateCarrier } from 'apis'
import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MaterialForm, nygFormik, useTheme } from 'ui'
import { dictsTransform } from 'utils'

const EditDialog: React.FC<{
  open: boolean
  chassisData: any
  areaInfosOptions: any[]
  onClose?: () => void
  callback?: () => void
  row?: Record<string, any>
}> = ({ open, chassisData = [], areaInfosOptions = [], onClose = () => {}, callback, row = {} }) => {
  const { t } = useVoerkaI18n()
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)

  React.useEffect(() => {
    if (!row.area) return
    row.area = areaInfosOptions.filter((obj: any) => row?.area?.includes(obj.value))
    formRef?.current?.setValues(row)
  }, [row, formRef, areaInfosOptions])

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
      <DialogTitle>{t('修改车辆配置信息')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={3}
          ref={formRef}
          schemaObject={[
            {
              name: 'ip',
              label: t('车辆IP'),
              type: 'text'
            },
            {
              name: 'name',
              label: t('车体名称'),
              type: 'text'
            },
            {
              name: 'id',
              label: t('车辆编号'),
              type: 'text',
              disabled: true
            },
            {
              name: 'chassisID',
              label: t('车辆类型'),
              type: 'select',
              items: vehicleTypeOptions
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
        <Button color="warning" onClick={onClose}>
          {t('取消')}
        </Button>
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
              await postUpdateCarrier(params)

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
export default EditDialog
