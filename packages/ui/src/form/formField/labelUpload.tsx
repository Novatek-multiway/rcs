import { InputProps } from "@mui/material";
import { Field } from "formik";

import { SimpleFileUpload } from "../components";

interface FormFieldLabelInputProps extends InputProps {
  label?: string;
  name: string;
  onChange?: any;
}

export const FormFieldLabelFile = ({
  label,
  name,
  onChange,
}: FormFieldLabelInputProps) => {
  const sxFormControl = {
    m: 1,
    minWidth: 140,
    width: "100%",
  };
  return (
    <Field
      formControl={{ sx: sxFormControl, variant: "standard" }}
      component={SimpleFileUpload}
      name={name}
      label={label}
      InputProps={{
        onChange: onChange,
      }}
    />
  );
};
