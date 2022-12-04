/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  ArrayTable,
  Editable,
  FormGrid,
  FormItem,
  FormLayout,
  IFormGridProps,
  IFormLayoutProps,
  IModalProps,
  Input,
  Select,
} from '@formily/antd';
import { createForm, Form, IFormProps, JSXComponent } from '@formily/core';
import {
  connect,
  createSchemaField,
  mapProps,
  mapReadPretty,
} from '@formily/react';
import { useCreation } from 'ahooks';
import { ModalProps, PopconfirmProps } from 'antd';
import React, { cloneElement, ReactElement } from 'react';
import { FieldType } from '../XTableFormRender';
import FormDialog from './FormDialog';
import './style.less';

type ModalTitle = string | number | React.ReactElement;

createModalFormRender.createForm = createForm;
createModalFormRender.connect = connect;
createModalFormRender.mapProps = mapProps;
createModalFormRender.mapReadPretty = mapReadPretty;

export interface ModalFormRenderProps<T> {
  trigger: ReactElement;
  modalProps?: ModalProps;
  fields: (form: Form) => FieldType<T>[];
  gridProps?: IFormGridProps;
  layoutProps?: IFormLayoutProps;
  onFinish?: (
    values: Record<string, any>,
    valuesOptions: Record<string, any>,
  ) => Promise<any> | void;
  onClose?: () => void;
  forOpen?: (payload: IFormProps) => Promise<IFormProps> | IFormProps;
  forConfirm?: (payload: Form) => Promise<Form> | Form;
  beforePopConfirm?: PopconfirmProps;
}

function createModalFormRender<T>(install: Record<string, JSXComponent>) {
  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      FormItem,
      FormGrid,
      Input,
      Select,
      ArrayTable,
      Editable,
      ...install,
    },
  });

  const SchemaFieldItem = (field: FieldType<T>, key: React.Key) => {
    if (field.type === 'ArrayTable') {
      const { columns, itemProps, ...props } = field;
      const { addition = {}, ...fieldProps } = props.props;

      return (
        <SchemaField.Array
          key={key}
          x-decorator="FormItem"
          x-component="ArrayTable"
          x-decorator-props={itemProps}
          x-component-props={{
            pagination: { pageSize: 10 },
            scroll: { x: '100%' },
            ...fieldProps,
          }}
          x-reactions={field.reactions}
          // {...props}
        >
          <SchemaField.Object>
            {columns?.map((column, idx) => {
              const { formField, operations, ...resetColumnProps } = column;
              const key = `column-${idx}`;
              if (operations) {
                // 按钮组模式
                return (
                  <SchemaField.Void
                    key={key}
                    x-component="ArrayTable.Column"
                    x-component-props={resetColumnProps}
                  >
                    <SchemaField.Void
                      x-decorator="FormItem"
                      x-component="FormItem"
                    >
                      {operations.map((operationType, key) => (
                        <SchemaField.Void
                          key={`column-${idx}-${operationType}-${key}`}
                          x-component={`ArrayTable.${operationType}`}
                        />
                      ))}
                    </SchemaField.Void>
                  </SchemaField.Void>
                );
              } else {
                const {
                  name,
                  valueType,
                  validator,
                  decorator,
                  type,
                  reactions,
                  itemProps,
                  props,
                  ...resetFormField
                } = formField;
                const Item =
                  SchemaField[
                    name || resetColumnProps.dataIndex
                      ? valueType || 'String'
                      : 'Void'
                  ];
                // 普通模式
                return (
                  <SchemaField.Void
                    key={key}
                    name={`column-${resetColumnProps.dataIndex}`}
                    x-component="ArrayTable.Column"
                    x-component-props={resetColumnProps}
                  >
                    <Item
                      {...resetFormField}
                      x-validator={validator}
                      name={name || resetColumnProps.dataIndex}
                      x-decorator={decorator || 'FormItem'}
                      x-component={type as any}
                      x-reactions={reactions}
                      x-decorator-props={itemProps}
                      x-component-props={props}
                    />
                  </SchemaField.Void>
                );
              }
            })}
          </SchemaField.Object>
          {addition && (
            <SchemaField.Void
              x-component="ArrayTable.Addition"
              title={addition.title || '添加条目'}
            />
          )}
        </SchemaField.Array>
      );
    }
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
        x-component={field.type as string}
        x-reactions={field.reactions}
        required={field.required}
        // {...field}
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
      onFinish?: (
        values: Record<string, any>,
        valuesOptions: Record<string, any>,
      ) => Promise<any> | void;
      beforePopConfirm?: PopconfirmProps;
    },
  ) {
    const {
      gridProps,
      layoutProps,
      fields,
      beforePopConfirm,
      onFinish,
      id = '',
    } = props;
    const modalProps = typeof title === 'string' ? { title } : title;

    return FormDialog(
      {
        maskClosable: false,
        ...(modalProps as any),
      },
      id as string,
      (form: Form) => {
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
      {
        beforePopConfirm,
        onFinish,
      },
    );
  }

  return function ModalFormRender(props: ModalFormRenderProps<T>) {
    const {
      trigger,
      modalProps,
      fields,
      onFinish,
      forOpen,
      forConfirm,
      gridProps,
      beforePopConfirm,
      layoutProps,
    } = props;
    const id = useCreation(() => (Math.random() * 1000000).toString(16), []);

    const openModal = (e: any) => {
      if (trigger.props.onClick && trigger.props.onClick(e) === false) {
        return;
      }
      const dialog = Dialog(
        {
          title: '',
          ...modalProps,
        },
        {
          beforePopConfirm,
          onFinish,
          gridProps,
          layoutProps,
          id: id,
          fields: fields,
        },
      );
      dialog
        .forOpen(async (payload, next) => {
          if (forOpen) {
            const res = await forOpen(payload);
            next(res);
          } else {
            next();
          }
        })
        .forConfirm(async (payload, next) => {
          if (forConfirm) {
            const res = await forConfirm(payload);
            next(res);
          } else {
            next();
          }
        })
        .open();
    };

    return (
      <FormDialog.Portal id={id}>
        {trigger && cloneElement(trigger, { onClick: openModal })}
      </FormDialog.Portal>
    );
  };
}

export default createModalFormRender;
