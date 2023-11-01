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

interface FieldSchema {
  name: string;
  label: string;
  helperText?: string;
  type?: string;
  multiple?: boolean; // 新增了 multiple 属性的类型定义
  items?: Array<{ value: string; label: string }>; // 新增了 items 属性的类型定义
  required?: boolean;
}

interface MaterialFormProps {
  defaultValue?: Record<string, any>;
  schemaObject: FieldSchema[];
}

export const MaterialForm = forwardRef<any, MaterialFormProps>((props, ref) => {
  const { defaultValue = {}, schemaObject } = props;
  const AutoToken = () => {
    const formikbag = useFormikContext();
    React.useImperativeHandle(ref, () => formikbag);
    return null;
  };
  const initValue = React.useMemo(() => {
    if (Array.isArray(schemaObject)) {
      const schemaKeys = schemaObject.reduce((pre, cur) => {
        const { name, multiple } = cur;
        pre[name] = multiple ? [] : "";
        return pre;
      }, {});
      return { ...schemaKeys, ...defaultValue };
    }
    return defaultValue;
  }, [defaultValue, schemaObject]);
  const schema = yup.object().shape(
    Array.isArray(schemaObject)
      ? schemaObject.reduce((shape, field) => {
          const required = field.required ?? false;
          let fieldSchema = field.multiple ? yup.array() : yup.string();
          if (field.multiple && field.type === "select") {
            fieldSchema = fieldSchema.test({
              name: field.name,
              message: `${field.label} 字段必填`,
              test: (value) => {
                return value && value.length > 0;
              },
            });
          }
          if (required) {
            fieldSchema = fieldSchema.required(`${field.label} 字段必填`);
          }
          return {
            ...shape,
            [field.name]: fieldSchema,
          };
        }, {})
      : {}
  );

  const fileds = () => {
    if (Array.isArray(schemaObject)) {
      return schemaObject.map((field) => {
        return (
          <Grid item xs={6} sm={6} md={6} key={field.name}>
            {field.type === "checkbox" && (
              <FormFieldLabelSwitch label="niyg" name={field.name} />
            )}
            {field.type === "select" && (
              <FormFieldLabelSelect
                label={field.label}
                name={field.name}
                items={field.items}
                multiple={field.multiple}
              />
            )}
            {field.type === "text" && (
              <FormFieldLabelText label={field.label} name={field.name} />
            )}
            {field.type === "number" && (
              <FormFieldLabelText
                label={field.label}
                name={field.name}
                type="number"
              />
            )}
          </Grid>
        );
      });
    }
  };
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
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              {fileds()}
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
};

MaterialForm.displayName = "MaterialForm";

export type nygFormik = ReturnType<typeof useFormikContext>;
