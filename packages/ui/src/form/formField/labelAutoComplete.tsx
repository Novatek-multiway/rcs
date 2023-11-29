import { SelectProps, TextField } from '@mui/material'
import { Field } from 'formik'

import { Autocomplete, AutocompleteRenderInputParams } from '../components'

interface FormFieldLabelSelectProps extends SelectProps {
  label?: string
  name: string
  items?: Array<{ value: string; label: string }>
  multiple?: boolean
  touched?: any
  errors?: any
}

export const FormFieldLabelAutoComplete = ({
  label,
  name,
  items,
  multiple = false,
  touched,
  errors
}: FormFieldLabelSelectProps) => {
  const sxFormControl = {
    minWidth: 140,
    width: '100%',
    m: 1
  }
  return (
    <>
      <Field
        name={name}
        component={Autocomplete}
        formControl={{ sx: sxFormControl, variant: 'outlined' }}
        options={items}
        multiple={multiple}
        size="small"
        // style={{ width: 300 }}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            sx={{
              my: 1,
              width: '100%'
            }}
            name={name}
            label={label}
            variant="outlined"
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              sx: {
                "input[type='search']::-webkit-search-cancel-button": {
                  display: 'none'
                }
              }
            }}
          />
        )}
      />
    </>
  )
}
