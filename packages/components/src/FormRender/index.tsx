import type { IFormGridProps, IFormLayoutProps } from '@formily/antd';
import {
  ArrayTable,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
} from '@formily/antd/esm';
import { createForm, Form } from '@formily/core';
import { createSchemaField, FormProvider, JSXComponent } from '@formily/react';
import { observable } from '@formily/reactive';
import { useCreation } from 'ahooks';
import { useEffect, useMemo } from 'react';
import Field, { FieldType } from './Field';

interface FormRenderProps {
  gridProps?: IFormGridProps;
  layoutProps?: IFormLayoutProps;
  install?: Record<any, JSXComponent>;
  fields: Omit<FieldType<keyof FormRenderProps['install']>, 'schemafield'>[];
  form?: Form;
  initialValues?: Partial<any>;
}

function FormRender(props: FormRenderProps) {
  const {
    layoutProps = {},
    gridProps = {},
    fields = [],
    form: formRef,
    initialValues,
    install,
  } = props;

  const SchemaField = useMemo(() => {
    return createSchemaField({
      components: {
        FormLayout,
        FormItem,
        FormGrid,
        Input,
        Select,
        ArrayTable,
        ...install,
      },
      scope: {},
    });
  }, []);

  const form = useCreation(
    () =>
      formRef
        ? formRef
        : createForm({
            initialValues: initialValues,
            effects() {},
          }),
    [!!formRef],
  );

  const obs = useMemo(
    () =>
      observable({
        layoutProps,
        gridProps,
      }),
    [],
  );

  useEffect(() => {
    obs.layoutProps = layoutProps;
  }, Object.values(layoutProps));

  useEffect(() => {
    obs.gridProps = gridProps;
  }, Object.values(gridProps));

  console.log('render');

  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-reactions={(field) => {
            field.setComponentProps(obs.layoutProps);
          }}
        >
          <SchemaField.Void
            x-component="FormGrid"
            x-reactions={(field) => {
              field.setComponentProps(obs.gridProps);
            }}
          >
            {fields.map((field: any, key) => (
              <Field<typeof install>
                key={key}
                {...field}
                schemafield={SchemaField as any}
              />
            ))}
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  );
}
FormRender.createForm = createForm;

export default FormRender;
