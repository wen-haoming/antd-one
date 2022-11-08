import type { IFormGridProps, IFormLayoutProps } from '@formily/antd';
import { FormGrid, FormItem, FormLayout, Input, Select } from '@formily/antd';
import type { Form } from '@formily/core';
import { createForm } from '@formily/core';
import type { JSXComponent } from '@formily/react';
import { createSchemaField, FormProvider } from '@formily/react';
import { useCreation } from 'ahooks';
import React from 'react';
import type { FieldType } from '../TableFormRender';

interface FormRenderProps<T> {
  gridProps?: IFormGridProps;
  layoutProps?: IFormLayoutProps;
  fields: FieldType<T>[];
  form?: Form;
}

function createFormRender<T>(install: Record<string, JSXComponent>) {
  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, FormGrid, Input, Select, ...install },
  });

  const SchemaFieldItem = (field: FieldType<T>, key: React.Key) => {
    const Item = SchemaField[field.name ? field.valueType || 'String' : 'Void'];

    return (
      <Item
        x-decorator="FormItem"
        key={key}
        name={field.name}
        title={field.title}
        x-decorator-props={{
          style: {
            marginBottom: 12,
          },
          ...field.itemProps,
        }}
        x-component-props={{
          allowClear: true,
          ...field.props,
        }}
        x-component={field.type}
        x-reactions={field.reactions}
        required={field.required}
        {...field}
      />
    );
  };

  function FormRender(props: FormRenderProps<T>) {
    const { layoutProps, gridProps, fields = [], form: formRef } = props;

    const form = useCreation(
      () => (formRef ? formRef : createForm({})),
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
              {fields.map((field, key) => SchemaFieldItem(field, `${key}`))}
            </SchemaField.Void>
          </SchemaField.Void>
        </SchemaField>
      </FormProvider>
    );
  }
  FormRender.createForm = createForm;
  return FormRender;
}

export default createFormRender;