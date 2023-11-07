import MuiInputBase, {
  InputBaseProps as MuiInputBaseProps,
} from "@mui/material/InputBase";
import { FieldProps } from "formik";
import * as React from "react";

export interface InputBaseProps
  extends FieldProps,
    Omit<MuiInputBaseProps, "name" | "value" | "error"> {}

export function fieldToInputBase({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting },
  onBlur,
  ...props
}: InputBaseProps): MuiInputBaseProps {
  return {
    disabled: disabled ?? isSubmitting,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

export function InputBase(props: InputBaseProps) {
  return <MuiInputBase {...fieldToInputBase(props)} />;
}

InputBase.displayName = "FormikMaterialUIInputBase";
