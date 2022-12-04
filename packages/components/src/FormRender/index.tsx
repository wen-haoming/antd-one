import type { IFormGridProps, IFormLayoutProps } from '@formily/antd';
import {
  ArrayTable,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
} from '@formily/antd/esm';
import type { Form } from '@formily/core';
import { createForm } from '@formily/core';
import type { JSXComponent } from '@formily/react';
import { createSchemaField, FormProvider } from '@formily/react';
import { useCreation } from 'ahooks';
import { useMemo } from 'react';
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
    layoutProps,
    gridProps,
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
    });
  }, []);

  const form = useCreation(
    () =>
      formRef
        ? formRef
        : createForm({
            initialValues: initialValues,
          }),
    [!!formRef],
  );

  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={layoutProps}
        >
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{
              maxColumns: 1,
              minColumns: 1,
              columnGap: 4,
              rowGap: 0,
              ...gridProps,
            }}
          >
            {fields.map((field, key) => (
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
