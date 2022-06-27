import { Button, Form, Space } from 'antd';
import type { FRField } from '../FormRender';
import { Render, useForm } from '../FormRender';
import type { XTableProps } from '../XTable';
import { XTable } from '../XTable';
import type { FC } from 'react';
import { useMemo } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { useAntdTable, useResponsive } from 'ahooks';
import type { AntdTableOptions } from 'ahooks/lib/useAntdTable/types';
import type { Field, FieldFunc } from '../FormRender/types';
import { getSplitCol } from './utils';
import { SheetComponent } from '@antv/s2-react';

export interface TableFormRenderProps {
  request: (
    pageData: { current: number; pageSize: number },
    formData: Record<string, any>,
  ) => Promise<{ total: number; list: any[] }>;
  requestOptions?: AntdTableOptions<any, any>;
  tableProps?: XTableProps & {
    columns: ({
      searchField?: Field | FieldFunc;
    } & ColumnsType<any>[number])[];
  };
}

const TableFormRender: FC<TableFormRenderProps> = (props) => {
  const { tableProps, request, requestOptions = {} } = props;
  const { columns = [], ...restTableProps } = tableProps || {};

  const responsive = useResponsive();
  const [form] = useForm();
  const tableRequest = useAntdTable(request, requestOptions);

  const responsiveCol = getSplitCol(responsive)

  const searchBtns = useMemo(() => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Space>
          <Button
            key="1"
            onClick={tableRequest.search.submit}
            loading={tableRequest.loading}
            type="primary"
          >
            查询
          </Button>
          <Button key="2" onClick={() => form.resetFields()}>
            重置
          </Button>
        </Space>
      </div>
    );
  }, [form, tableRequest.loading, tableRequest.search.submit]);

  const fields = useMemo(() => {
    const _fields = columns
      .filter((item: any) => {
        return !!item.searchField;
      })
      .map((item: any) => {
        return item.searchField;
      });

    _fields.push({
      render: searchBtns,
      col: {
        span: responsiveCol,
        offset: 24 - (_fields.length * responsiveCol % 24) - responsiveCol
      }
    } as Field);
    return _fields;
  }, [columns, responsive, searchBtns]);



  return (
    <>
      <Form form={form} style={{ marginBottom: '1em' }}>
        <Render
          form={form}
          fields={fields as FRField}
          colProps={{ span: responsiveCol }}
        />
      </Form>
      <XTable columns={columns} {...tableRequest.tableProps} {...restTableProps}  />
    </>
  );
};

export default TableFormRender;
