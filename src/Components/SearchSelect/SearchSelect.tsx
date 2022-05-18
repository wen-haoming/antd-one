import { FC, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Select, Modal, Table, Spin } from 'antd';
import type { SelectProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useBoolean, useRequest, usePrevious, useCreation } from 'ahooks';
import { AppstoreOutlined } from '@ant-design/icons';
import styles from './SearchSelect.less';

interface RequestRes {
  total: number;
  list: { label: string; value: string | number | null }[];
}

export interface SearchSelectProps extends SelectProps {
  request: (params: Record<string, unknown> | string | number | null) => Promise<RequestRes>;
  modalConfig?: {
    title: string;
    columns: ColumnsType<any>;
  };
  debounceWait?: number;
  debounceLeading?: boolean;
  debounceTrailing?: boolean;
  debounceMaxWait?: number;
  throttleWait?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;
  refreshDeps?: any[];
  ready?: boolean;
}

const SearchSelect: FC<SearchSelectProps> = (props) => {
  const [visibile, { setTrue, setFalse }] = useBoolean(false);
  const {
    value,
    suffixIcon,
    filterOption,
    debounceWait,
    debounceLeading,
    debounceTrailing,
    debounceMaxWait,
    modalConfig,
    showSearch = true,
    throttleWait = 1000,
    request,
    refreshDeps = [],
    ready,
    allowClear = true,
    ...rest
  } = props;
  const [firstData, setFirstData] = useState<RequestRes>(() => ({ total: 0, list: [] }));
  const firstDataMap = useCreation(() => new Map(), []);
  const previosRefreshDeps = usePrevious(refreshDeps);
  const dropdownWrapRef = useRef<HTMLDivElement>(null);

  const selectRequest = useRequest(request, {
    refreshDeps,
    ready,
    throttleWait: throttleWait,
    onSuccess(res) {
      // 第一次加载
      if (
        (!value && firstData.list.length === 0) ||
        previosRefreshDeps?.join(',') !== refreshDeps.join(',')
      ) {
        setFirstData(res);
        firstDataMap.clear();
        res.list.forEach(({ label, value }) => {
          if (value) {
            firstDataMap.set(value, label);
          }
        });
        return;
      }
      // 每次新的加载(有可能是关键字搜索，也有可能是 value 搜索)，需要合并到首页
      const mergeList = res.list.filter(({ label, value }) => {
        const has = !firstDataMap.has(value);
        if (!has) {
          // 不存在的情况下
          firstDataMap.set(value, label);
        }
        return has;
      });
      if (mergeList.length > 0) {
        setFirstData({
          list: [...mergeList, ...firstData.list],
          total: mergeList.length + firstData.total,
        });
      }
    },
  });

  const onSearch = (val: string) => {
    // 关键字搜索，过滤空格
    selectRequest.run(val.replace(/(^\s*)|(\s*$)/g, ''));
  };


  return (
    <>
      <Select
        {...rest}
        allowClear={allowClear}
        value={value}
        onSearch={!filterOption ? onSearch : undefined}
        showSearch={showSearch}
        loading={selectRequest.loading}
        notFoundContent={
          <div style={{ textAlign: 'center' }}>
            {selectRequest.loading ? <Spin size="small" tip="加载中..." /> : <div>暂无数据</div>}
          </div>
        }
        suffixIcon={
          <div style={{ position: 'relative' }}>
            {modalConfig && (
              <AppstoreOutlined onClick={setTrue} className={styles['drawer-icon']} />
            )}
            {suffixIcon}
          </div>
        }
        options={firstData.list || []}
        dropdownRender={(menu) => <div ref={dropdownWrapRef}>{menu}</div>}
        onPopupScroll={(s)=>{
          if(s.target.scrollHeight - s.target.scrollTop <= 200){
            console.log(123,'==')
            // selectRequest.run(val.replace(/(^\s*)|(\s*$)/g, ''));
          }
        }}
        listHeight={200}
        // onDropdownVisibleChange={(open)=>{
        //     if(open){
        //       setTimeout(()=>{
        //         if(dropdownWrapRef.current){
        //           dropdownWrapRef.current.onscroll = ()=>{
        //             console.log(123,'==')
        //           }
        //         }
        //       })
        //     }
        // }}
      />
      {modalConfig && (
        <Modal title={modalConfig.title} visible={visibile} onOk={setFalse} onCancel={setFalse}>
          <Table columns={modalConfig.columns} />
        </Modal>
      )}
    </>
  );
};

export default SearchSelect;
