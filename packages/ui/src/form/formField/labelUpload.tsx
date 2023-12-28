import { InputProps } from '@mui/material'
import { Field } from 'formik'

import { SimpleFileUpload, SimpleFileUploadProps } from '../components'

interface FormFieldLabelInputProps extends InputProps, Partial<SimpleFileUploadProps> {
  label?: string
  name: string
  onChange?: any
}

export const FormFieldLabelFile = ({ label, name, onChange, accept, placeholder }: FormFieldLabelInputProps) => {
  console.log('🚀 ~ file: labelUpload.tsx ~ line 13 ~ FormFieldLabelFile ~ placeholder', placeholder)
  const sxFormControl = {
    m: 1,
    minWidth: 140,
    width: '100%'
  }
  return (
    <Field
      formControl={{ sx: sxFormControl, variant: 'standard' }}
      component={SimpleFileUpload}
      name={name}
      label={label}
      accept={accept}
      InputProps={{
        onChange: onChange
      }}
      placeholder={placeholder}
    />
  )
}
