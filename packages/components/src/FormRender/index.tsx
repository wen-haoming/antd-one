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
      scope: {},
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

  const obs = useMemo(() => observable(layoutProps || {}), []);

  useEffect(() => {
    if (layoutProps?.layout) {
      obs.layout = layoutProps?.layout;
    }
  }, [layoutProps?.layout]);

  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          name="layout"
          // x-reactions={{
          //   dependencies: [layoutProps?.layout],
          //   fulfill: {
          //     state: {
          //       componentProps: {
          //         layout: '{{$deps[0]}}'
          //       }
          //     }
          //   }
          // }}
          x-component="FormLayout"
          x-reactions={(field) => {
            field.component[1].layout = obs.layout;
          }}
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
