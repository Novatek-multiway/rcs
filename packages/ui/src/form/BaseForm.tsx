import { Button, Grid, LinearProgress, Paper } from "@mui/material";
import {
  Field,
  Form,
  Formik,
  FormikContextType,
  TextField,
  useFormikContext,
  yup,
} from "mui-form";
import PropTypes from "prop-types";
import * as React from "react";

import { forwardRef } from "../utils/inex";

interface Props {
  defaultValue?: Record<string, any>;
  schemaObject: Array<{
    name: string;
    label: string;
    helperText?: string;
    type?: string;
  }>;
}

const BaseForm = forwardRef((props, ref) => {
  const { defaultValue = {}, schemaObject } = props;
  const AutoSubmitToken = () => {
    const formikbag = useFormikContext();
    React.useImperativeHandle(ref, () => formikbag);
    return null;
  };
  const initValue = React.useMemo(() => {
    if (Array.isArray(schemaObject)) {
      const schemaKeys = schemaObject.reduce((pre, cur) => {
        const { name } = cur;
        pre[name] = "";
        return pre;
      }, {});
      return { ...defaultValue, ...schemaKeys };
    }
    return defaultValue;
  }, [defaultValue, schemaObject]);
  const schema = yup.object().shape(
    Array.isArray(schemaObject)
      ? schemaObject.reduce((shape, field) => {
          shape[field.name] = yup.string().required();
          return shape;
        }, {})
      : {}
  );

  const fileds = React.useMemo(() => {
    if (Array.isArray(schemaObject)) {
      return schemaObject.map((field) => {
        return (
          <Grid item xs={6} sm={6} md={6} key={field.name}>
            <Field
              key={field.name}
              component={TextField}
              type={field.type || "text"}
              label={field.label}
              variant="outlined"
              size="small"
              select={field.type === "select"}
              formControl={{ sx: { m: 1, minWidth: 140 } }}
              name={field.name}
              helperText={field.helperText || ""}
            />
          </Grid>
        );
      });
    }
  }, [schemaObject]);
  return (
    <Paper elevation={4}>
      <Formik
        initialValues={initValue}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 2000);
        }}
      >
        {({ submitForm, isSubmitting, values }) => (
          <Form>
            <Grid container spacing={2}>
              {fileds}
            </Grid>

            {isSubmitting && <LinearProgress />}
            <AutoSubmitToken />
          </Form>
        )}
      </Formik>
    </Paper>
  );
});

BaseForm.propTypes = {
  defaultValue: PropTypes.object,
  schemaObject: PropTypes.array,
};

BaseForm.displayName = "BaseForm";

export default BaseForm;
export type FormikContext = FormikContextType<unknown>;
