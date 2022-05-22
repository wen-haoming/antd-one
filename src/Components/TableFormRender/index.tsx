import { Form } from 'antd';
import type { FRField} from '../FormRender';
import { Render, useForm } from '../FormRender';
import type { XTableProps } from '../XTable';
import { XTable } from '../XTable';
import type { FC} from 'react';
import { useMemo } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { useAntdTable } from 'ahooks';
import type { AntdTableOptions } from 'ahooks/lib/useAntdTable/types';
export interface TableFormRenderProps extends XTableProps {
  request: (
    pageData: { current: number; pageSize: number },
    formData: Record<string, any>,
  ) => Promise<{ total: number; list: any[] }>;
  requestOptions?: AntdTableOptions<any, any>;
  columns: (ColumnsType<any>[number] & {
    searchField?: FRField;
  })[];
}

const TableFormRender: FC<TableFormRenderProps> = (props) => {
  const { columns, request, requestOptions = {} } = props;

  const [form] = useForm();

  const tableRequest = useAntdTable(request, requestOptions);

  const fields = useMemo(() => {
    return columns
      .filter((item) => {
        return !!item.searchField;
      })
      .map((item) => {
        const searchField = item.searchField;
        Reflect.deleteProperty(item, 'searchField');
        return searchField;
      });
  }, []);

  return (
    <>
      <Form form={form}>
        <Render form={form} fields={fields as FRField} />
      </Form>
      <XTable columns={columns} {...tableRequest.tableProps} />
    </>
  );
};

export default TableFormRender;
