/**
 * 1. 自适应高度
 * 2. toolbarRender 统一布局
 */
import { Card, Space, Table } from 'antd';
import type { TableProps } from 'antd/es/table/Table';
import type { FC, ReactNode } from 'react';
import { memo, useState, useEffect } from 'react';
import styles from './index.less';

interface Props {
  toolbarRender?: (
    rowKeys: string[],
    rows: any[],
  ) =>
    | ReactNode
    | ((refresh: () => void, rowKeys: string[], rows: any[]) => ReactNode);
  refresh?: () => void;
}

export const XTable: FC<Props & TableProps<any>> = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { toolbarRender, scroll, rowSelection, pagination, refresh, ...rest } =
    props;

  function onSelectChange(selectedKeys: [], selectedRows: any[]) {
    setSelectedRowKeys(selectedKeys);
    setSelectedRows(selectedRows);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (rowSelection?.onSelectChange) {
      rowSelection?.onSelectChange(selectedKeys, selectedRows);
    }
  }

  const myRowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = rowSelection?.selectedRowKeys
    ? rowSelection?.selectedRowKeys.length > 0
    : selectedRowKeys.length > 0;

  useEffect(() => {
    if (!rest.loading) {
      setSelectedRowKeys([]);
      setSelectedRows([]);
    }
  }, [rest.loading]);

  return (
    <Card className={styles.tableCard}>
      <Table
        {...rest}
        title={() =>
          toolbarRender && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Space align="baseline">
                {hasSelected && (
                  <div className={styles.selectDesc}>
                    已选中
                    <span>
                      {rowSelection?.selectedRowKeys
                        ? rowSelection?.selectedRowKeys.length
                        : selectedRowKeys.length}
                    </span>
                    项
                  </div>
                )}
                {refresh
                  ? toolbarRender(refresh, selectedRowKeys, selectedRows)
                  : toolbarRender(selectedRowKeys, selectedRows)}
              </Space>
            </div>
          )
        }
        size="small"
        scroll={{ y: scroll?.y || 'calc(100vh - 410px)', x: scroll?.x }}
        pagination={{
          pageSizeOptions: ['10', '30', '50', '100'],
          ...pagination,
          defaultPageSize: 30,
          showQuickJumper: true,
          showTotal: (total) => `共${total}项`,
        }}
        size="small"
        rowSelection={
          rowSelection
            ? {
                ...myRowSelection,
                ...rowSelection,
              }
            : null
        }
      />
    </Card>
  );
};

export default memo<Props & TableProps<any>>(XTable);
