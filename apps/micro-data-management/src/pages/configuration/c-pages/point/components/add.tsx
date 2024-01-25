import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { CreateStationInfos } from 'apis'
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
  useTheme
} from 'ui'

const AddDialog: React.FC<{
  open: boolean
  vertexData?: any
  carrierData?: any
  chassisList?: any
  onClose?: () => void
  callback?: () => void
}> = ({ open, onClose = () => {}, callback, vertexData = [], chassisList = [] }) => {
  const { t } = useVoerkaI18n()
  const { runAsync: run } = useRequest(CreateStationInfos, {
    manual: true
  })
  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const { dicts } = useDictStore()

  const [isStandByPoint, setIsStandByPoint] = React.useState<boolean>(false)

  const standByPointSchema = [
    {
      name: 'HomeGroup',
      label: t('待命点分组'),
      type: 'number'
    },
    {
      name: 'HomeGroupType',
      label: t('待命点类型'),
      type: 'number'
    },
    {
      name: 'HomeGroupPriority',
      label: t('待命点优先级'),
      type: 'number'
    }
  ]
  const commonSchema = [
    {
      name: 'PointKey',
      label: t('路径编号'),
      type: 'autoComplete',
      required: true,
      items: vertexData
      // type: "select",
    },
    {
      name: 'Priority',
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
      name: 'Type',
      label: t('站点类型'),
      type: 'select',
      items: dicts['StationType'],
      onChange: (e: any) => setIsStandByPoint(e.target.value + '' === '2')
    },
    {
      name: 'AreaID',
      label: t('区域'),
      type: 'autoComplete',
      multiple: true,
      items: vertexData
    },
    {
      name: 'CarrierType',
      label: t('车辆类型'),
      type: 'select',
      items: chassisList
    },
    {
      name: 'Name',
      label: t('名称'),
      type: 'text'
    }
  ]

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('添加站点')}</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <MaterialForm
          columns={3}
          ref={formRef}
          defaultValue={{
            Angle: 0,
            AreaID: [],
            BackGroundColor: '',
            Carrier: 0,
            CarrierType: 0,
            DisPlayLength: 0,
            DisPlayModel: '',
            DisPlayWidth: 0,
            DisplayFontColor: '',
            DisplayName: '',
            HomeGroup: 0,
            HomeGroupPriority: 0,
            HomeGroupType: 0,
            ID: 0,
            Name: '',
            Number: 0,
            Priority: 0,
            State: 0,
            Type: 0,
            UsageCount: 0,
            WorkAreaTypeStr: ''
          }}
          schemaObject={isStandByPoint ? commonSchema.concat(...standByPointSchema) : commonSchema}
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
            console.log(values)

            if (isValid) {
              const sendData = {
                ...values,
                // Genus: 3,
                AreaID: values.AreaID.map((item) => Number(item.value)),
                PointKey: Number(values.PointKey.value),
                Type: Number(values.Type)
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
