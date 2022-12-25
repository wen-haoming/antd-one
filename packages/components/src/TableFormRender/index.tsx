import { Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

import { IFormGridProps, IFormLayoutProps } from '@formily/antd';
import { createForm, Form, JSXComponent } from '@formily/core';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { toJS } from '@formily/reactive';
import { Col, Row } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table';
import FormRender, { FieldType } from '../FormRender';
import ProTable, { ProTableProps } from '../ProTable';

export interface TableFormRenderProps<T> {
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

function createTableFormRender<T>() {
  function TableFormRender(props: TableFormRenderProps<T>) {
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
    const { gridProps = { maxColumns: 4 }, layoutProps } = formProps || {};

    const form = useMemo(
      () => (formRef ? formRef : createForm({})),
      [columns, formRef],
    );

    const fiels = useMemo(() => {
      return toJS(
        columns
          .filter((item) => !!item.searchField)
          .map((field) => {
            if (field.searchField && !field.searchField.name) {
              field.searchField.name = field?.dataIndex as string;
            }
            if (field.searchField && !field.searchField.title) {
              field.searchField.title = field?.title;
            }
            return toJS(field.searchField);
          }),
      );
    }, [columns]);

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
      <div style={{ flex: 1, background: '#efeff2', padding: '5px' }}>
        <ProTable
          {...tableProps}
          table={table}
          request={tableRequest}
          requestOptions={requestOptions}
          columns={columns}
          HeaderRender={(query) => (
            <FormRender
              form={form}
              fields={fiels as any}
              install={install}
              layoutProps={layoutProps}
              gridProps={gridProps}
            >
              {(schemaFields) => {
                return (
                  <Row
                    style={{
                      background: '#fff',
                      borderRadius: 5,
                      marginBottom: 10,
                      padding: 10,
                      boxSizing: 'border-box',
                      boxShadow: `rgba(0, 0, 0, 0.05) 0px 0px 0px 1px`,
                    }}
                  >
                    <Col span={20}>{schemaFields}</Col>
                    <Col span={4}>
                      <FormRender.FormButtonGroup align="right">
                        <FormRender.Submit
                          type="primary"
                          icon={<SearchOutlined />}
                          loading={query.loading}
                          onSubmit={query.search.submit}
                        >
                          查询
                        </FormRender.Submit>
                        <FormRender.Reset icon={<Loading3QuartersOutlined />}>
                          重置
                        </FormRender.Reset>
                      </FormRender.FormButtonGroup>
                    </Col>
                  </Row>
                );
              }}
            </FormRender>
          )}
        />
      </div>
    );
  }
  TableFormRender.useTable = ProTable.useTable;
  TableFormRender.createForm = createForm;
  return TableFormRender;
}

createTableFormRender.createForm = createForm;
createTableFormRender.connect = connect;
createTableFormRender.mapProps = mapProps;
createTableFormRender.mapReadPretty = mapReadPretty;

export default createTableFormRender;
