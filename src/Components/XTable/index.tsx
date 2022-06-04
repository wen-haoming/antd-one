import type { TableProps } from 'antd';
import { Table } from 'antd';
import type { FC, ReactNode } from 'react';

export type XTableProps = TableProps<any> & {
  toolBar?: (cols: any[], colsIndex: number[], refresh: () => void) => ReactNode;
};

export const XTable: FC<XTableProps> = (props) => {
  const { dataSource, columns, toolBar, ...rest } = props;

  return (
    <>
      <Table  {...rest} dataSource={dataSource} columns={columns} />
    </>
  );
};

export default XTable;
