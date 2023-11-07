import { FormControlLabel, styled, SwitchProps } from "@mui/material";
import { Field } from "formik";

import { Switch } from "../components";

interface FormFieldLabelSwitchProps extends SwitchProps {
  label?: string;
  name: string;
}

const StyledLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: theme.spacing(0),
}));

export const FormFieldLabelSwitch = ({
  label,
  name,
}: FormFieldLabelSwitchProps) => {
  return (
    <StyledLabel
      label={label}
      labelPlacement="start"
      control={<Field component={Switch} name={name} type="checkbox" />}
    />
  );
};
