import { SelectProps } from "@mui/material";
import { Field } from "formik";

import { Select } from "../components";

interface FormFieldLabelSelectProps extends SelectProps {
  label?: string;
  name: string;
}

export const FormFieldLabelSelect = ({
  label,
  name,
}: FormFieldLabelSelectProps) => {
  const sxFormControl = {
    m: 1,
    minWidth: 140,
    width: "100%",
  };
  return (
    <Field
      component={Select}
      formControl={{ sx: sxFormControl, variant: "standard" }}
      inputLabel={{
        shrink: true,
        variant: "standard",
        htmlFor: "age-native",
      }}
      id={name}
      name={name}
      native
      labelId="age-native"
      label={label}
      inputProps={{
        name,
        id: "age-native",
      }}
    >
      <option value="">None</option>
      <option value={10}>Ten</option>
      <option value={20}>Twenty</option>
      <option value={30}>Thirty</option>
    </Field>
  );
};
