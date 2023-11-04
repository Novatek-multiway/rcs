import { FormControl, FormLabel } from "@mui/material";
import MuiRadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material/RadioGroup";
import { FieldProps } from "formik";
import * as React from "react";

export interface RadioGroupProps
  extends FieldProps,
    Omit<MuiRadioGroupProps, "name" | "value"> {}

export function fieldToRadioGroup({
  field: { onBlur: fieldOnBlur, ...field },
  form,
  onBlur,
  ...props
}: RadioGroupProps): MuiRadioGroupProps {
  return {
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

export function RadioGroup(props: RadioGroupProps) {
  console.log(props);
  return (
    <FormControl {...props.formControl}>
      <FormLabel id="demo-controlled-radio-buttons-group">
        {props.label}
      </FormLabel>
      <MuiRadioGroup {...fieldToRadioGroup(props)} />
    </FormControl>
  );
}

RadioGroup.displayName = "FormikMaterialUIRadioGroup";
