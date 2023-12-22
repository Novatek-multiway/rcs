import { MenuItem, SelectProps } from '@mui/material'
import { Field } from 'formik'

import { Select } from '../components'

interface FormFieldLabelSelectProps extends SelectProps {
  label?: string
  name: string
  items?: Array<{ value: string; label: string }>
  multiple?: boolean
}

export const FormFieldLabelSelect = ({ label, name, items, multiple = false, onChange }: FormFieldLabelSelectProps) => {
  const sxFormControl = {
    minWidth: 140,
    width: '100%',
    m: 1
    // margin: "0 !important",
  }
  return (
    <>
      <Field
        component={Select}
        formControl={{ sx: sxFormControl, variant: 'outlined' }}
        inputLabel={{
          variant: 'outlined',
          htmlFor: `${name}-native`
        }}
        size="small"
        multiple={multiple}
        id={name}
        name={name}
        labelId={`${name}-native`}
        label={label}
        onChange={onChange}
      >
        {items?.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          )
        })}
      </Field>
    </>
  )
}
