import { Button, Grid, LinearProgress, Paper } from '@mui/material'
import { Field, Form, Formik, TextField, yup } from 'mui-form'
import PropTypes from 'prop-types'
import * as React from 'react'

import { forwardRef } from '../utils/inex'

interface Props {
  defaultValue?: Record<string, any>
  schemaObject: Array<{
    name: string
    label: string
    helperText?: string
  }>
}

const BaseForm = forwardRef<'div', Props>((props, ref) => {
  const { defaultValue = {}, schemaObject } = props
  const initValue = React.useMemo(() => {
    if (Array.isArray(schemaObject)) {
      const schemaKeys = schemaObject.reduce((pre, cur) => {
        const { name } = cur
        pre[name] = ''
        return pre
      }, {})
      return { ...defaultValue, ...schemaKeys }
    }
    return defaultValue
  }, [defaultValue, schemaObject])
  const schema = yup.object().shape(
    Array.isArray(schemaObject)
      ? schemaObject.reduce((shape, field) => {
          shape[field.name] = yup.string().required()
          return shape
        }, {})
      : {}
  )

  const fileds = React.useMemo(() => {
    if (Array.isArray(schemaObject)) {
      return schemaObject.map((field) => {
        return (
          <Field
            key={field.name}
            component={TextField}
            type="text"
            label={field.label}
            name={field.name}
            helperText={field.helperText || ''}
          />
        )
      })
    }
  }, [schemaObject])

  return (
    <Paper elevation={4}>
      <Formik
        initialValues={initValue}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
          }, 2000)
        }}
      >
        {({ submitForm, isSubmitting, values }) => (
          <Form>
            {fileds}
            {isSubmitting && <LinearProgress />}
            <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Grid container spacing={2}></Grid>
    </Paper>
  )
})

BaseForm.propTypes = {
  defaultValue: PropTypes.object,
  schemaObject: PropTypes.array
}

BaseForm.displayName = 'BaseForm'

export default BaseForm
