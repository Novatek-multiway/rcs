import { FormControlLabel, Radio, RadioGroupProps } from "@mui/material";
import { Field } from "formik";

import { RadioGroup } from "../components";

interface FormFieldLabelSelectProps extends RadioGroupProps {
  label?: string;
  name: string;
  items?: Array<{ value: string; label: string }>;
}

export const FormFieldLabelRadioGroup = ({
  label,
  name,
  items = [
    { label: "12", value: "12" },
    { label: "12", value: "12" },
  ],
  ...props
}: FormFieldLabelSelectProps) => {
  const sxFormControl = {
    minWidth: 140,
    margin: "0 !important",
  };
  return (
    <>
      <Field
        component={RadioGroup}
        formControl={{ sx: sxFormControl, variant: "standard" }}
        id={name}
        name={name}
        labelId={`${name}-native`}
        label={label}
        row
        {...props}
      >
        {items?.map((item) => {
          return (
            <FormControlLabel
              value="painting"
              control={<Radio />}
              label="Painting"
            />
          );
        })}
      </Field>
    </>
  );
};
