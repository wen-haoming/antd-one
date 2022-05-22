import type { TableProps } from 'antd';
import { Table } from 'antd';
import type { FC } from 'react';

export type XTableProps = TableProps<any>

const XTable: FC<XTableProps> = (props) => {
  const { dataSource, columns } = props;
  return <Table dataSource={dataSource} columns={columns} />;
};

export default XTable;
