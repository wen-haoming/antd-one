import { useAntdTable } from 'ahooks';
import type {
  AntdTableOptions,
  AntdTableResult,
  Data,
  Params,
} from 'ahooks/lib/useAntdTable/types';
import type { Service } from 'ahooks/lib/usePagination/types';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import type { ReactNode } from 'react';
import { useMemo, useRef } from 'react';
import type { ProXTableInstance } from './useTable';
import { useTable } from './useTable';

export type ProTableProps = {
  /**
   *  @description  请求函数,与 ahooks 的[useAntdTable](https://ahooks.js.org/zh-CN/hooks/use-antd-table) 的请求一致
   */
  request: Service<Data, Params>;
  /**
   *  @description  请求函数,与 ahooks 的[useAntdTable](https://ahooks.js.org/zh-CN/hooks/use-antd-table) 的属性一致
   */
  requestOptions?: AntdTableOptions<any, any>;
  /**
   *  @description  table 的实例携带请求的方法,配合 [table] = ProXTable.useTable();
   */
  table?: ProXTableInstance;
  /**
   *  @description  头部渲染区域
   */
  HeaderRender?: (tableRequestResult: AntdTableResult<any, any>) => ReactNode;
} & Omit<TableProps<any>, 'dataSource'>;

function ProTable(props: ProTableProps) {
  const { request, requestOptions, table, HeaderRender, ...rest } = props;

  const refreshParamsRef = useRef<Record<string, any>>({});

  const tableRequestResult = useAntdTable((params) => {
    return request({ ...params, ...refreshParamsRef.current });
  }, requestOptions);

  const [proXTable] = useTable(table);

  useMemo(() => {
    // 引用值覆盖
    proXTable.tableRequestInstance = tableRequestResult;
  }, [tableRequestResult]);

  const headerRender = useMemo(() => {
    return HeaderRender ? HeaderRender(tableRequestResult) : null;
  }, [HeaderRender, tableRequestResult]);

  return (
    <>
      {headerRender}
      <Table {...tableRequestResult.tableProps} {...rest} />
    </>
  );
}

ProTable.useTable = useTable;

export default ProTable;
