import React from 'react';
import type { FC } from 'react';
import { useState, useCallback, memo } from 'react';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import XTable from '@/components/XTable/Table';
import { EllipsisOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import type { FetchCallback } from './Select';
import { useRequest } from 'ahooks';
import styles from './index.less';

export interface PopModalProps extends ModalProps {
  fetchCallback: FetchCallback;
  columns: any[];
  onModalSelect: (row: any, row2: any) => void;
}

const PopModal: FC<PopModalProps> = (props) => {
  const { fetchCallback, columns, onModalSelect, width, ...rest } = props;
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const [selectRow, setSelectRow] = useState({});

  const request = useRequest(fetchCallback, {
    ready: visible,
    refreshDeps: [visible],
  });

  const handleDbClick = useCallback((record: any) => {
    // onModalSelect(record.value, record);
    setFalse();
  }, []);

  const handleOk = useCallback(() => {
    // onModalSelect(selectRow.value, selectRow);
    setFalse();
  }, [selectRow]);

  return (
    <>
      <EllipsisOutlined className={styles.selectBtn} onClick={setTrue} style={{ fontSize: 16 }} />
      <Modal
        visible={visible}
        destroyOnClose
        onCancel={setFalse}
        onOk={handleOk}
        width={width}
        {...rest}
      >
        {/* <XTable
          columns={columns}
          inTotal={request.data?.total}
          dataSource={request.data?.list}
          onSelected={setSelectRow}
          onRowDoubleClick={handleDbClick}
          onFilterChange={request.run}
        /> */}
      </Modal>
    </>
  );
};

export default memo(PopModal);
