import { Button, Form, Space } from 'antd';
import type { FRField } from '../FormRender';
import { Render, useForm } from '../FormRender';
import type { XTableProps } from '../XTable';
import { XTable } from '../XTable';
import type { FC} from 'react';
import { useMemo } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { useAntdTable } from 'ahooks';
import type { AntdTableOptions } from 'ahooks/lib/useAntdTable/types';
import type { Field, FieldFunc } from '../FormRender/types';
export interface TableFormRenderProps extends XTableProps {
  request: (
    pageData: { current: number; pageSize: number },
    formData: Record<string, any>,
  ) => Promise<{ total: number; list: any[] }>;
  requestOptions?: AntdTableOptions<any, any>;
  columns: (ColumnsType<any>[number] & {
    searchField?: Field | FieldFunc;
  })[];
}

const TableFormRender: FC<TableFormRenderProps> = (props) => {
  const { columns, request, requestOptions = {} } = props;

  const [form] = useForm();

  const tableRequest = useAntdTable(request, requestOptions);

  const searchBtns = useMemo(()=>{
      return <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Space>
        <Button key="1" onClick={tableRequest.search.submit} loading={tableRequest.loading} type="primary">
          查询
        </Button>
        <Button key="2" onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </div>
  },[form, tableRequest.loading, tableRequest.search.submit])

  const fields = useMemo(() => {
    const _fields = columns
      .filter((item) => {
        return !!item.searchField;
      })
      .map((item) => {
        const searchField = item.searchField;
        return searchField;
      });

    _fields.splice(3, 0, {
      render: searchBtns,
    });

    return _fields.reduce((pre,cur,idx)=>{
        if(!cur) return pre
        if(idx % 4 === 0){
          pre.push([cur])
        }else{
         const item = pre.pop();
         item.push(cur);
         pre.push(item)
        }
        return pre
    },[]);
  }, [columns, searchBtns]);

  return (
    <>
      <Form form={form} style={{ marginBottom: '1em' }}>
        <Render form={form} fields={fields as FRField} row={true} col={true} />
      </Form>
      <XTable columns={columns} {...tableRequest.tableProps} />
    </>
  );
};

export default TableFormRender;
