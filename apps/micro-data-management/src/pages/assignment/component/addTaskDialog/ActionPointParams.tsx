import { useAsyncEffect } from 'ahooks'
import { getVertexs } from 'apis'
import { Field, Form, Formik } from 'formik'
import { fieldToTextField, TextFieldProps as FormikTextFieldProps } from 'formik-mui'
import { isNil } from 'lodash'
import type { FC } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { useDictStore } from 'store'
import { Autocomplete, Button, MenuItem, Paper, TextField, Typography } from 'ui'

import { ActionPointParamsWrapper } from './style'
import { IOption, ITaskFormData } from './type'

export type TActionPointParams = Omit<ITaskFormData, 'vehicleId' | 'priority' | 'isAutoCompleted'>

export interface IActionPointParamsProps {
  onSubmit?: (actionPointParams: TActionPointParams) => void
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

// TODO 虚拟列表优化
// TODO 列表搜索K
const initialValues: TActionPointParams = {
  taskPoint: null,
  action: 0,
  param1: 0,
  param2: 0,
  param3: 0,
  param4: 0,
  id: 0
}
const ActionPointParams: FC<IActionPointParamsProps> = (props) => {
  const { onSubmit } = props
  const orderActionOptions = useDictStore((state) => state.dicts.OrderActionType)
  const [vertexOptions, setVertexOptions] = useState<IOption[]>([])
  useAsyncEffect(async () => {
    const vertexRes = await getVertexs()
    const newVertexOptions = vertexRes.data.map((item: any) => ({
      value: item.id,
      label: item.id
    }))
    setVertexOptions(newVertexOptions)
  }, [])

  return (
    <Paper
      sx={{
        padding: 2,
        height: '100%'
      }}
    >
      <Formik<TActionPointParams>
        initialValues={initialValues}
        onSubmit={async (values) => {
          onSubmit?.(values)
        }}
        validate={(values) => {
          const errors: Partial<Record<keyof ITaskFormData, string>> = {}
          if (isNil(values.taskPoint) || values.taskPoint + '' === '') {
            errors.taskPoint = '请选择任务点'
          } else if (isNil(values.action) || values.action + '' === '') {
            errors.action = '请选择动作类型'
          }
          return errors
        }}
      >
        {({ isSubmitting, submitForm, setFieldValue, errors, resetForm, values, validateForm }) => (
          <ActionPointParamsWrapper>
            <Form>
              <Typography variant="h6" fontSize={15}>
                命令参数
              </Typography>
              <Autocomplete
                options={vertexOptions.map((c) => Number(c.value))}
                getOptionLabel={(option: number) => option + ''}
                onChange={(e, value) => {
                  setFieldValue('taskPoint', value)
                }}
                value={values.taskPoint}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="任务点"
                    name="taskPoint"
                    variant="outlined"
                    size="small"
                    required
                    error={!!errors.taskPoint}
                    helperText={errors.taskPoint ? errors.taskPoint : ''}
                  />
                )}
              />

              <Field component={CustomTextField} select name="action" label="动作类型" variant="outlined" size="small">
                {orderActionOptions.map((item: IOption) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Field>
              <Typography variant="h6" fontSize={15}>
                扩展参数
              </Typography>
              <Field
                component={CustomTextField}
                name="param1"
                type="number"
                label="参数1"
                variant="outlined"
                size="small"
              />
              <Field
                component={CustomTextField}
                name="param2"
                type="number"
                label="参数2"
                variant="outlined"
                size="small"
              />
              <Field
                component={CustomTextField}
                name="param3"
                type="number"
                label="参数3"
                variant="outlined"
                size="small"
              />
              <Field
                component={CustomTextField}
                name="param4"
                type="number"
                label="参数4"
                variant="outlined"
                size="small"
              />
              <Field component={CustomTextField} name="id" type="number" label="轴id" variant="outlined" size="small" />
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
                添加
              </Button>
            </Form>
          </ActionPointParamsWrapper>
        )}
      </Formik>
    </Paper>
  )
}

export default memo(ActionPointParams)
