import {
  InputAdornment,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { Field } from "formik";

import { TextField } from "../components";

interface FormFieldLabelTextProps
  extends Omit<MuiTextFieldProps, "name" | "value" | "error"> {
  label?: string;
  name: string;
  helperText?: string;
  type?: string;
  disabled?: boolean;
}

export const FormFieldLabelText = ({
  label,
  name,
  helperText,
  type,
  disabled,
  ...props
}: FormFieldLabelTextProps) => {
  const sxFormControl = {
    m: 1,
    minWidth: 140,
  };
  return (
    <>
      <Field
        component={TextField}
        formControl={{ sx: sxFormControl, variant: "standard" }}
        variant="outlined"
        id={name}
        size="small"
        name={name}
        native
        type={type || "text"}
        label={label}
        disabled={disabled}
        helperText={helperText || ""}
        inputProps={{
          name,
          id: "age-native",
        }}
        {...props}
      ></Field>
    </>
  );
};
