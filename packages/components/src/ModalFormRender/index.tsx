import type {
  IFormGridProps,
  IFormLayoutProps,
  IModalProps,
} from '@formily/antd';
import { FormGrid, FormItem, FormLayout, Input, Select } from '@formily/antd';
import type { Form, JSXComponent } from '@formily/core';
import { createForm } from '@formily/core';
import {
  connect,
  createSchemaField,
  mapProps,
  mapReadPretty,
} from '@formily/react';
import React from 'react';
import type { FieldType } from '../TableFormRender';
import FormDialog from './FormDialog';
type ModalTitle = string | number | React.ReactElement;

function createModalFormRender<T>(install: Record<string, JSXComponent>) {
  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, FormGrid, Input, Select, ...install },
  });

  const SchemaFieldItem = (field: FieldType<T>, key: React.Key) => {
    // 如果没有 name 就是 Void 组件，并且如果不指定 valueType name
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

  function Dialog(
    title: IModalProps | ModalTitle,
    props: {
      id?: string;
      gridProps?: IFormGridProps;
      layoutProps?: IFormLayoutProps;
      fields: (form: Form) => FieldType<T>[];
      onFinish?: () => Promise<any>;
    },
  ) {
    const { gridProps, layoutProps, fields } = props;
    const modalProps = typeof title === 'string' ? { title } : title;

    return FormDialog(
      {
        maskClosable: false,
        ...(modalProps as any),
      },
      (form) => {
        const getFields = fields(form);
        return (
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
                {getFields.map((field, key) =>
                  SchemaFieldItem(field, `${key}`),
                )}
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField>
        );
      },
    );
  }
  Dialog.Portal = FormDialog.Portal;
  return Dialog;
}
createModalFormRender.createForm = createForm;
createModalFormRender.connect = connect;
createModalFormRender.mapProps = mapProps;
createModalFormRender.mapReadPretty = mapReadPretty;

export default createModalFormRender;
