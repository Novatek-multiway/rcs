import { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { Field } from "formik";

import { TextField } from "../components";

interface FormFieldLabelTextProps
  extends Omit<MuiTextFieldProps, "name" | "value" | "error"> {
  label?: string;
  name: string;
  helperText?: string;
  type?: string;
}

export const FormFieldLabelText = ({
  label,
  name,
  helperText,
  type,
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
        labelId="age-native"
        type={type || "text"}
        label={label}
        helperText={helperText || ""}
        inputProps={{
          name,
          id: "age-native",
        }}
      ></Field>
    </>
  );
};
