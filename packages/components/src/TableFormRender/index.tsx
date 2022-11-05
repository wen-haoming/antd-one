import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import type {
  IFormGridProps,
  IFormItemProps,
  IFormLayoutProps,
} from '@formily/antd';
import {
  FormButtonGroup,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Reset,
  Select,
  Submit,
} from '@formily/antd';
import type { Form, JSXComponent } from '@formily/core';
import { createForm } from '@formily/core';
import type { ISchema, SchemaKey } from '@formily/react';
import {
  connect,
  createSchemaField,
  FormProvider,
  mapProps,
  mapReadPretty,
} from '@formily/react';
import { useCreation } from 'ahooks';
import { Col, Row } from 'antd';
import type { ColumnGroupType, ColumnType } from 'antd/lib/table';
import React, { useMemo } from 'react';
import type { ProTableProps } from '..';
import { ProTable } from '..';

export type FieldType<T> = Omit<ISchema, 'type'> & {
  type: keyof T | 'Input' | 'Select';
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

function createTableFormRender(install: Record<string, JSXComponent>) {
  const SchemaField = createSchemaField({
    components: { FormLayout, FormItem, FormGrid, Input, Select, ...install },
  });

  function TableFormRender(props: XTableFormRenderProps<typeof install>) {
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

    const searchField = useMemo(() => {
      return columns
        .filter((item) => !!item.searchField)
        .map((field, idx) => {
          if (field.searchField && !field.searchField.name) {
            field.searchField.name = field?.dataIndex as SchemaKey;
          }
          if (field.searchField && !field.searchField.title) {
            field.searchField.title = field?.title;
          }
          return SchemaFieldItem(field.searchField as any, idx);
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
      return request({ ...params, ...values }, valuesOptions);
    };

    return (
      <ProTable
        {...tableProps}
        table={table}
        request={tableRequest}
        requestOptions={requestOptions}
        HeaderRender={(query) => (
          <FormProvider form={form}>
            <div style={{ padding: 10 }}>
              <Row
                style={{
                  background: '#fff',
                  borderRadius: 5,
                  padding: '13px 13px 0px 13px',
                  boxSizing: 'border-box',
                  boxShadow: `rgba(0, 0, 0, 0.05) 0px 0px 0px 1px`,
                }}
              >
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
                          columnGap: 4,
                          rowGap: 0,
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
            </div>
          </FormProvider>
        )}
        columns={columns}
      />
    );
  }
  TableFormRender.useTable = ProTable.useTable;
  return TableFormRender;
}

createTableFormRender.createForm = createForm;
createTableFormRender.connect = connect;
createTableFormRender.mapProps = mapProps;
createTableFormRender.mapReadPretty = mapReadPretty;

export default createTableFormRender;
