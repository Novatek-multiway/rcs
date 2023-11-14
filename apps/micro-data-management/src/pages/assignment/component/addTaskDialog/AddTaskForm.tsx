import { useAsyncEffect } from 'ahooks'
import { getControlStates, getVertexs } from 'apis'
import { Field, Form, Formik } from 'formik'
import { CheckboxProps, fieldToCheckbox, fieldToTextField, TextFieldProps } from 'formik-mui'
import { isNil } from 'lodash'
import type { FC } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { useDictStore } from 'store'
import { Button, Checkbox, FormControlLabel, MenuItem, Paper, TextField, Typography } from 'ui'

import { AddTaskFormWrapper } from './style'
import { IOption, ITaskFormData } from './type'

export interface IAddTaskFormProps {
  onSubmit?: (formData: ITaskFormData) => void
}

// hack 临时解决TextField主题问题

const CustomTextField = memo((props: TextFieldProps) => {
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
const CustomCheckbox = memo((props: CheckboxProps & { label: string }) => {
  const {
    form: { setFieldValue },
    field: { name },
    label
  } = props
  const onChange = useCallback(
    (event: any) => {
      const { value } = event.target
      setFieldValue(name, value)
    },
    [setFieldValue, name]
  )

  return (
    <FormControlLabel
      control={
        <Checkbox
          size="small"
          sx={{
            py: 0
          }}
          {...(fieldToCheckbox(props) as any)}
          onChange={onChange}
        />
      }
      label={label}
      sx={{
        ml: 'auto',
        '.MuiFormControlLabel-label': {
          fontSize: 14
        }
      }}
    />
  )
})

// TODO 虚拟列表优化
// TODO 列表搜索
const AddTaskForm: FC<IAddTaskFormProps> = (props) => {
  const { onSubmit } = props
  const orderActionOptions = useDictStore((state) => state.dicts.OrderActionType)
  console.log('🚀 ~ file: AddTaskForm.tsx ~ line 79 ~ orderActionOptions', orderActionOptions)
  const [carrierOptions, setCarrierOptions] = useState<IOption[]>([])
  const [vertexOptions, setVertexOptions] = useState<IOption[]>([])
  useAsyncEffect(async () => {
    const carrierRes = await getControlStates()
    const newCarrierOptions = carrierRes.data.map((item: any) => ({
      label: item.id,
      value: item.id
    }))
    setCarrierOptions(newCarrierOptions)

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
      <Formik<ITaskFormData>
        initialValues={{
          vehicleId: '' as any,
          priority: 0,
          isAutoCompleted: true,
          taskPoint: 0,
          action: 0,
          param1: 0,
          param2: 0,
          param3: 0,
          param4: 0,
          id: 0
        }}
        onSubmit={async (values) => {
          console.log('🚀 ~ file: AddTaskForm.tsx ~ line 119 ~ onSubmit={ ~ values', values)
          onSubmit?.(values)
        }}
        validate={(values) => {
          const errors: Partial<Record<keyof ITaskFormData, string>> = {}
          if (isNil(values.vehicleId) || values.vehicleId + '' === '') {
            errors.vehicleId = '请选择车辆'
          } else if (isNil(values.priority) || values.priority + '' === '') {
            errors.priority = '请输入优先级'
          } else if (isNil(values.taskPoint) || values.taskPoint + '' === '') {
            errors.taskPoint = '请选择任务点'
          } else if (isNil(values.action) || values.action + '' === '') {
            errors.taskPoint = '请选择动作类型'
          }
          return errors
        }}
      >
        {({ isSubmitting, submitForm }) => (
          <AddTaskFormWrapper>
            <Form>
              <Typography variant="h6" fontSize={15}>
                任务参数
              </Typography>
              <Field
                component={CustomTextField}
                select
                name="vehicleId"
                label="指定车辆"
                variant="outlined"
                size="small"
              >
                {carrierOptions.map((item: IOption) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Field>

              <Field
                component={CustomTextField}
                name="priority"
                type="number"
                label="优先级"
                variant="outlined"
                size="small"
                required
              />
              <Field component={CustomCheckbox} type="checkbox" name="isAutoCompleted" label="是否自动结束任务" />
              <Typography variant="h6" fontSize={15}>
                命令参数
              </Typography>
              <Field
                component={CustomTextField}
                name="taskPoint"
                label="任务点"
                variant="outlined"
                size="small"
                required
                select
              >
                {vertexOptions.map((v) => (
                  <MenuItem key={v.value} value={v.value}>
                    {v.label}
                  </MenuItem>
                ))}
              </Field>

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
                onClick={submitForm}
                size="small"
              >
                添加
              </Button>
            </Form>
          </AddTaskFormWrapper>
        )}
      </Formik>
    </Paper>
  )
}

export default memo(AddTaskForm)
