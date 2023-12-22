import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest, useUpdateEffect } from 'ahooks'
import { UpdateStationInfos } from 'apis'
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
import { toastWarn } from 'utils'
const EditDialog: React.FC<{
  open: boolean
  areaInfos?: any
  vertexData?: any
  carrierData?: any
  chassisList?: any
  onClose?: () => void
  callback?: () => void
  row?: Record<string, any>
}> = ({ open, onClose = () => {}, callback, areaInfos = [], vertexData = [], chassisList = [], row = {} }) => {
  const { t } = useVoerkaI18n()
  const { runAsync: run } = useRequest(UpdateStationInfos, {
    manual: true
  })

  const theme = useTheme()
  const formRef = React.useRef<nygFormik>(null)
  const { dicts } = useDictStore()
  const [currentStationType, setCurrentStationType] = React.useState(row.Type)

  useUpdateEffect(() => {
    setCurrentStationType(row.Type)
  }, [row.Type])

  const schemaObject = React.useMemo(() => {
    const commonSchema = [
      {
        name: 'PointKey',
        label: t('路径编号'),
        type: 'autoComplete',
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
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrentStationType(e.target.value)
        }
      },
      {
        name: 'AreaID',
        label: t('区域'),
        type: 'autoComplete',
        multiple: true,
        items: areaInfos
      },
      {
        name: 'CarrierType',
        label: t('车辆类型'),
        type: 'select',
        items: [{ label: t('全部'), value: 0 }].concat(...chassisList)
      },

      {
        name: 'Name',
        label: t('名称'),
        type: 'text'
      }
    ]

    const dynamicSchema =
      currentStationType === 2
        ? [
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
        : []

    return [...commonSchema, ...dynamicSchema]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaInfos, chassisList, dicts, vertexData, currentStationType])

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('修改站点')}</DialogTitle>
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
            PointKey: {
              label: String(row.PointKey),
              value: String(row.PointKey)
            },
            AreaID: areaInfos.filter((a: any) => row?.AreaID?.includes(a.value))
          }}
          schemaObject={schemaObject}
        ></MaterialForm>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            await formRef.current?.submitForm()
            const { isValid, values, errors } = formRef.current || {}
            if ((errors as Record<string, string>)['PointKey']) {
              toastWarn(t('请输入路径编号'))
            }

            if (isValid) {
              const sendData = {
                ...values,
                UsageCount: 0,
                AreaID: values.AreaID.map((item) => Number(item.value)),
                PointKey: Number(values.PointKey.value),

                Type: Number(values.Type),
                Carrier: Number(values.Carrier),
                CarrierType: Number(values.CarrierType)
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
export default EditDialog
