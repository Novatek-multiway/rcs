import { SelectProps, TextField } from "@mui/material";
import { Field } from "formik";

import { Autocomplete, AutocompleteRenderInputParams } from "../components";

interface FormFieldLabelSelectProps extends SelectProps {
  label?: string;
  name: string;
  items?: Array<{ value: string; label: string }>;
  multiple?: boolean;
  touched?: any;
  errors?: any;
}

export const FormFieldLabelAutoComplete = ({
  label,
  name,
  items,
  multiple = false,
  touched,
  errors,
}: FormFieldLabelSelectProps) => {
  const sxFormControl = {
    minWidth: 140,
    width: "100%",
    margin: "0 !important",
  };
  return (
    <>
      <Field
        name={name}
        component={Autocomplete}
        formControl={{ sx: sxFormControl, variant: "standard" }}
        options={items}
        multiple={multiple}
        // style={{ width: 300 }}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            name={name}
            label={label}
            variant="standard"
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    </>
  );
};
