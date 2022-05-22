import type { TableProps } from 'antd';
import { Table } from 'antd';
import type { FC } from 'react';

export type XTableProps = TableProps<any>;

export const XTable: FC<XTableProps> = (props) => {
  const { dataSource, columns, ...rest } = props;

  return (
    <>
      <Table {...rest} dataSource={dataSource} columns={columns} />
    </>
  );
};

export default XTable;
