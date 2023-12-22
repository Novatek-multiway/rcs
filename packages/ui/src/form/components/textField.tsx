import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { FieldProps, getIn } from 'formik'
import * as React from 'react'

export interface TextFieldProps extends FieldProps, Omit<MuiTextFieldProps, 'name' | 'value' | 'error'> {
  formControl?: any
}

export function fieldToTextField({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors },
  onBlur,
  helperText,
  ...props
}: TextFieldProps): MuiTextFieldProps {
  const fieldError = getIn(errors, field.name)
  const showError = getIn(touched, field.name) && !!fieldError

  return {
    error: showError,
    helperText: showError ? fieldError : helperText,
    disabled: disabled ?? isSubmitting,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name)
      },
    ...field,
    ...props
  }
}

export function TextField({ formControl, ...props }: TextFieldProps) {
  return (
    // <MuiTextField
    //   sx={{ width: "100%" }}
    //   {...fieldToTextField(props)}
    //   variant="standard"
    // >
    //   {children}
    // </MuiTextField>
    <FormControl size={props.size} {...formControl}>
      <InputLabel htmlFor="standard-adornment-password">{props.label}</InputLabel>
      <OutlinedInput
        id="standard-adornment-password"
        {...fieldToTextField(props)}
        type={props.type || 'text'}
        endAdornment={props.endAdornment || null}
      />
    </FormControl>
  )
}

TextField.displayName = 'FormikMaterialUITextField'
