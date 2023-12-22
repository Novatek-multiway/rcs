import { Close } from '@mui/icons-material'
import { useVoerkaI18n } from '@voerkai18n/react'
import { useAsyncEffect } from 'ahooks'
import { getVertexs } from 'apis'
import { Field, Form, Formik, FormikConfig } from 'formik'
import { fieldToTextField, TextFieldProps as FormikTextFieldProps } from 'formik-mui'
import { isNil } from 'lodash'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { useDictStore } from 'store'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography
} from 'ui'

import { TActionPointParams } from '../addTaskDialog/ActionPointParams'
import { AddActionPointDialogContentWrapper } from './style'

type IAddActionPointParams = TActionPointParams & {
  headingAngle: number
  actionDelay: number
  relevant: string
}

interface IAddActionPointDialogProps {
  open: boolean
  onClose?: () => void
  onSave?: (data: any) => void
}

// hack 临时解决TextField主题问题
const CustomTextField = memo((props: FormikTextFieldProps) => {
  const {
    form: { setFieldValue },
    field: { name },
    type
  } = props
  const onChange = useCallback(
    (event: any) => {
      let { value } = event.target
      if (type === 'number') value = Number(value)
      setFieldValue(name, value)
    },
    [setFieldValue, name, type]
  )

  return <TextField {...(fieldToTextField(props) as any)} onChange={onChange} />
})

const initialValues: IAddActionPointParams = {
  taskPoint: null,
  action: 0,
  param1: 0,
  param2: 0,
  param3: 0,
  param4: 0,
  id: 0,
  headingAngle: 0,
  actionDelay: 0,
  relevant: ''
}
const AddActionPointDialog: FC<PropsWithChildren<IAddActionPointDialogProps>> = (props) => {
  const { open, onClose, onSave } = props
  const { t } = useVoerkaI18n()
  const orderActionOptions = useDictStore((state) => state.dicts.OrderActionType)
  const [vertexOptions, setVertexOptions] = useState<number[]>([])
  useAsyncEffect(async () => {
    const vertexRes = await getVertexs()
    const newVertexOptions = vertexRes.data.map((item: any) => item.id)
    setVertexOptions(newVertexOptions)
  }, [])
  const handleClose = useCallback<NonNullable<DialogProps['onClose']>>(
    (e, reason) => {
      if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
        onClose?.()
      }
    },
    [onClose]
  )

  const handleSubmit = useCallback<FormikConfig<IAddActionPointParams>['onSubmit']>(
    (values) => {
      const { taskPoint, id, action, param1, param2, param3, param4, headingAngle, actionDelay, relevant } = values
      onSave?.({
        VertexID: taskPoint,
        GoodsID: '',
        AxisID: id,
        Action: action,
        Param: [param1, param2, param3, param4],
        HeadingAngle: headingAngle,
        ActionDelay: actionDelay,
        Relevant: relevant
      })
    },
    [onSave]
  )
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'xs'}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 0.5
        }}
      >
        <span>{t('添加任务点')}</span>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
          background: '#434446'
        }}
      >
        <AddActionPointDialogContentWrapper>
          <Paper
            sx={{
              padding: 2,
              height: '100%'
            }}
          >
            <Formik<IAddActionPointParams>
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={(values) => {
                const errors: Partial<Record<keyof IAddActionPointParams, string>> = {}
                if (isNil(values.taskPoint) || values.taskPoint + '' === '') {
                  errors.taskPoint = t('请选择任务点')
                } else if (isNil(values.action) || values.action + '' === '') {
                  errors.action = t('请选择动作类型')
                }
                return errors
              }}
            >
              {({ isSubmitting, submitForm, setFieldValue, errors, resetForm, values, validateForm }) => (
                <Form>
                  <Typography variant="h6" fontSize={15}>
                    {t('命令参数')}
                  </Typography>
                  <Autocomplete
                    options={vertexOptions}
                    getOptionLabel={(option: number) => option + ''}
                    onChange={(e, value) => {
                      setFieldValue('taskPoint', value)
                    }}
                    value={values.taskPoint}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t('任务点')}
                        name="taskPoint"
                        variant="outlined"
                        size="small"
                        required
                        error={!!errors.taskPoint}
                        helperText={errors.taskPoint ? errors.taskPoint : ''}
                      />
                    )}
                  />

                  <Field
                    component={CustomTextField}
                    select
                    name="action"
                    label={t('动作类型')}
                    variant="outlined"
                    size="small"
                  >
                    {orderActionOptions.map((item: any) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Field>
                  <Typography variant="h6" fontSize={15}>
                    {t('扩展参数')}
                  </Typography>
                  <Field
                    component={CustomTextField}
                    name="param1"
                    type="number"
                    label={t('参数1')}
                    variant="outlined"
                    size="small"
                  />

                  <Field
                    component={CustomTextField}
                    name="param2"
                    type="number"
                    label={t('参数2')}
                    variant="outlined"
                    size="small"
                  />

                  <Field
                    component={CustomTextField}
                    name="param3"
                    type="number"
                    label={t('参数3')}
                    variant="outlined"
                    size="small"
                    inputProps={{
                      min: 0
                    }}
                  />

                  <Field
                    component={CustomTextField}
                    name="param4"
                    type="number"
                    label={t('参数4')}
                    variant="outlined"
                    size="small"
                  />

                  <Field
                    component={CustomTextField}
                    name="id"
                    type="number"
                    label={t('轴id')}
                    variant="outlined"
                    size="small"
                    inputProps={{
                      min: 0
                    }}
                  />

                  <Field
                    component={CustomTextField}
                    name="headingAngle"
                    type="number"
                    label={t('停止角度')}
                    variant="outlined"
                    size="small"
                  />

                  <Field
                    component={CustomTextField}
                    name="actionDelay"
                    type="number"
                    label={t('动作延迟')}
                    variant="outlined"
                    size="small"
                    helperText={t('单位: 秒')}
                  />

                  <Field
                    component={CustomTextField}
                    name="relevant"
                    label={t('附加信息')}
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    sx={{
                      margin: '0 auto'
                    }}
                    variant="outlined"
                    color="info"
                    disabled={isSubmitting}
                    onClick={async () => {
                      await submitForm()
                      const errors = await validateForm()
                      setTimeout(() => {
                        Object.keys(errors).length === 0 && resetForm()
                      })
                    }}
                    size="small"
                  >
                    {t('添加')}
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </AddActionPointDialogContentWrapper>
      </DialogContent>
    </Dialog>
  )
}

export default memo(AddActionPointDialog)
