import { FormControlLabel, SwitchProps } from "@mui/material";
import { Field } from "formik";

import { Switch } from "../components";

interface FormFieldLabelSwitchProps extends SwitchProps {
  label?: string;
  name: string;
}

export const FormFieldLabelSwitch = ({
  label,
  name,
}: FormFieldLabelSwitchProps) => {
  return (
    <FormControlLabel
      label={label}
      control={
        <Field
          component={Switch}
          name={name}
          value="designer"
          type="checkbox"
        />
      }
    />
  );
};
