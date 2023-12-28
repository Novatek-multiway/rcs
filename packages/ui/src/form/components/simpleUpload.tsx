import Source from '@mui/icons-material/Source'
import { InputBaseComponentProps } from '@mui/material'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import { InputLabelProps } from '@mui/material/InputLabel'
import { FieldProps, getIn } from 'formik'
import { MuiFileInput } from 'mui-file-input'
import * as React from 'react'

export interface SimpleFileUploadProps extends FieldProps {
  label?: string
  accept: string
  disabled?: boolean
  InputProps?: InputBaseComponentProps
  InputLabelProps?: InputLabelProps
  formControl?: FormControlProps
  placeholder?: string
}

export const SimpleFileUpload = ({
  field,
  form: { isSubmitting, touched, errors, setFieldValue },
  label,
  accept,
  disabled = false,
  formControl,
  InputProps: inputProps,
  placeholder
}: SimpleFileUploadProps) => {
  console.log('🚀 ~ file: simpleUpload.tsx ~ line 29 ~ placeholder', placeholder)
  const error = getIn(touched, field.name) && getIn(errors, field.name)
  const [value, setValue] = React.useState<File | null>(null)

  const handleChange = (newValue: File | null) => {
    setValue(newValue)
    setFieldValue(field.name, newValue)
  }

  return (
    <FormControl {...formControl}>
      <MuiFileInput
        value={value}
        onChange={handleChange}
        error={!!error}
        label={label}
        size="small"
        placeholder={placeholder || 'Insert a file'}
        InputProps={{
          inputProps: {
            accept,
            ...inputProps
          },
          startAdornment: <Source />
        }}
        disabled={disabled || isSubmitting}
      />
      {/* {error && <FormHelperText error>{error}</FormHelperText>} */}
    </FormControl>
  )
}
