import { Grid, LinearProgress, Paper } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import { yup } from "mui-form";
import PropTypes from "prop-types";
import * as React from "react";

import { forwardRef } from "../utils/inex";
import {
  FormFieldLabelSelect,
  FormFieldLabelSwitch,
  FormFieldLabelText,
} from "./formField";

interface Props {
  defaultValue?: Record<string, any>;
  schemaObject: Array<{
    name: string;
    label: string;
    helperText?: string;
    type?: string;
  }>;
}

const MaterialForm = forwardRef((props, ref) => {
  const { defaultValue = {}, schemaObject } = props;
  const AutoToken = () => {
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
          shape[field.name] = yup.string().required(`${field.label} 字段必填`);
          return shape;
        }, {})
      : {}
  );

  const fileds = React.useMemo(() => {
    if (Array.isArray(schemaObject)) {
      return schemaObject.map((field) => {
        return (
          <Grid item xs={6} sm={6} md={6} key={field.name}>
            {field.type === "checkbox" && (
              <FormFieldLabelSwitch label="niyg" name={field.name} />
            )}
            {field.type === "select" && (
              <FormFieldLabelSelect label="niyg1" name={field.name} />
            )}
            {field.type === "text" && (
              <FormFieldLabelText label="niyg2" name={field.name} />
            )}
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
            <AutoToken />
          </Form>
        )}
      </Formik>
    </Paper>
  );
});

MaterialForm.propTypes = {
  defaultValue: PropTypes.object,
  schemaObject: PropTypes.array,
};

MaterialForm.displayName = "MaterialForm";

export default MaterialForm;
