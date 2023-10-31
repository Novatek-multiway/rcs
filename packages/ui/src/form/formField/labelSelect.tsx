import { MenuItem, SelectProps } from "@mui/material";
import { Field } from "formik";

import { Select } from "../components";

interface FormFieldLabelSelectProps extends SelectProps {
  label?: string;
  name: string;
  items?: Array<{ value: string; label: string }>;
  multiple?: boolean;
}

export const FormFieldLabelSelect = ({
  label,
  name,
  items,
  multiple = false,
}: FormFieldLabelSelectProps) => {
  const sxFormControl = {
    m: 1,
    minWidth: 140,
    width: "100%",
  };
  return (
    <>
      <Field
        component={Select}
        formControl={{ sx: sxFormControl, variant: "standard" }}
        inputLabel={{
          shrink: true,
          variant: "standard",
          htmlFor: `${name}-native`,
        }}
        multiple={multiple}
        id={name}
        name={name}
        labelId={`${name}-native`}
        label={label}
      >
        {items?.map((item) => {
          return <MenuItem value={item.value}>{item.label}</MenuItem>;
        })}
      </Field>
    </>
  );
};
