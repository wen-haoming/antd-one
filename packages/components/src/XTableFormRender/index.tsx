/* eslint-disable @typescript-eslint/no-use-before-define */
import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import {
  FormButtonGroup,
  FormGrid,
  FormItem,
  FormLayout,
  IFormGridProps,
  IFormItemProps,
  IFormLayoutProps,
  Input,
  Reset,
  Select,
  Submit,
} from '@formily/antd';
import { createForm, Form, JSXComponent } from '@formily/core';
import {
  connect,
  createSchemaField,
  FormProvider,
  ISchema,
  mapProps,
  mapReadPretty,
  SchemaKey,
} from '@formily/react';
import { useCreation } from 'ahooks';
import { Col, Row } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table';
import React, { useMemo } from 'react';
import { ProTable, ProTableProps } from '../';

type ArrayTableComponentType =
  | 'SortHandle'
  | 'Addition'
  | 'Remove'
  | 'MoveDown'
  | 'MoveUp'
  | 'Index';

export type FieldType<T> = Omit<ISchema, 'type'> & {
  type: keyof T | 'Input' | 'Select' | 'ArrayTable' | 'Editable.Popover';
  valueType?:
    | 'String'
    | 'Number'
    | 'Markup'
    | 'Object'
    | 'Array'
    | 'Boolean'
    | 'Date'
    | 'DateTime'
    | 'Void';
  name?: SchemaKey;
  title?: ISchema['title'];
  itemProps?: IFormItemProps;
  props?: ISchema['x-component-props'];
  required?: ISchema['required'];
  reactions?: ISchema['x-reactions'];
  validator?: ISchema['x-validator'];
  decorator?: 'FormItem' | 'Editable';
  // ArrayTablle 才需要
  columns?: ((Omit<ColumnGroupType<any>, 'children'> & ColumnType<any>) & {
    dataIndex: string;
    formField: FieldType<T> & {
      popoverFields?: FieldType<T>[];
    };
    operations?: ArrayTableComponentType[];
    name?: 'string';
  })[];
};

export interface XTableFormRenderProps<T> {
  request: ProTableProps['request'];
  requestOptions?: ProTableProps['requestOptions'];
  columns: ((Omit<ColumnGroupType<any>, 'children'> & ColumnType<any>) & {
    searchField?: FieldType<T>;
  })[];
  install?: Record<string, JSXComponent>;
  formProps?: {
    gridProps?: IFormGridProps;
    layoutProps?: IFormLayoutProps;
  };
  tableProps?: Omit<ProTableProps, 'request' | 'columns'>;
  form?: Form;
  table?: ReturnType<typeof ProTable.useTable>[0];
}

createTableFormRender.createForm = createForm;
createTableFormRender.connect = connect;
createTableFormRender.mapProps = mapProps;
createTableFormRender.mapReadPretty = mapReadPretty;

function createTableFormRender<T>(install: Record<string, JSXComponent>) {
  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, FormGrid, Input, Select, ...install },
  });

  TableFormRender.useTable = ProTable.useTable;
  TableFormRender.createForm = createForm;

  function TableFormRender(props: XTableFormRenderProps<T>) {
    const {
      request,
      requestOptions,
      columns,
      install = {},
      formProps,
      tableProps,
      table,
      form: formRef,
    } = props;
    const { gridProps, layoutProps } = formProps || {};
    const form = useCreation(
      () => (formRef ? formRef : createForm({})),
      [!!formRef],
    );

    const SchemaFieldItem = (
      field: FieldType<typeof install>,
      key: React.Key,
    ) => {
      // 如果没有 name 就是 Void 组件，并且如果不指定 valueType name
      const Item =
        SchemaField[field.name ? field.valueType || 'String' : 'Void'];
      return (
        <Item
          x-decorator="FormItem"
          key={key}
          name={field.name}
          title={field.title}
          x-decorator-props={{
            style: {
              marginBottom: 5,
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

    const searchField = useMemo(() => {
      return columns
        .filter((item) => !!item.searchField)
        .map((column, idx) => {
          if (column.searchField && !column.searchField.name) {
            column.searchField.name = column?.dataIndex as SchemaKey;
          }
          if (column.searchField && !column.searchField.title) {
            column.searchField.title = column?.title;
          }
          return SchemaFieldItem(column.searchField as any, idx);
        });
    }, []);

    const tableRequest = (params: Record<string, any>) => {
      const values = form.values;
      const valuesOptions = Object.keys(values).reduce<Record<string, any>>(
        (pre, key) => {
          const val = form.getFieldState(key)?.inputValues;
          if (val && val.length && val.length > 1) {
            pre[key] = val[1];
          }
          return pre;
        },
        {},
      );
      // 第二个参数是表单的第二个值
      return request({ ...params, ...values }, valuesOptions);
    };

    return (
      <div style={{ flex: 1, background: '#efeff2', padding: '5px' }}>
        <ProTable
          {...tableProps}
          table={table}
          request={tableRequest}
          requestOptions={requestOptions}
          HeaderRender={(query) => (
            <div style={{ marginBottom: 5 }}>
              <FormProvider form={form}>
                <Row>
                  <Col span={20}>
                    <SchemaField>
                      <SchemaField.Void
                        x-component="FormLayout"
                        x-component-props={layoutProps}
                      >
                        <SchemaField.Void
                          x-component="FormGrid"
                          x-component-props={{
                            maxColumns: 4,
                            minColumns: 4,
                            columnGap: 20,
                            rowGap: 10,
                            ...gridProps,
                          }}
                        >
                          {searchField}
                        </SchemaField.Void>
                      </SchemaField.Void>
                    </SchemaField>
                  </Col>
                  <Col span={4}>
                    <FormButtonGroup align="right">
                      <Submit
                        icon={<SearchOutlined />}
                        loading={query.loading}
                        onSubmit={query.search.submit}
                      >
                        查询
                      </Submit>
                      <Reset icon={<Loading3QuartersOutlined />}>重置</Reset>
                    </FormButtonGroup>
                  </Col>
                </Row>
              </FormProvider>
            </div>
          )}
          columns={columns}
        />
      </div>
    );
  }
  return TableFormRender;
}

export default createTableFormRender;
