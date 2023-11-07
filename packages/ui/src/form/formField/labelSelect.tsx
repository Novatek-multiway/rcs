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
    minWidth: 140,
    width: "100%",
    m: 1,
    // margin: "0 !important",
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
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Field>
    </>
  );
};
