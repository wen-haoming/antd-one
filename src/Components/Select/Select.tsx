import type { FC } from 'react';
import { useEffect } from 'react';
import { useState, useRef, useCallback } from 'react';
import { Spin } from 'antd';
import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';

import { useRequest } from 'ahooks';
import uniqBy from 'lodash/uniqBy';
import concat from 'lodash/concat';
import { useMemo } from 'react';

interface ListItem {
  label: string;
  value: string | number;
}

type FetchCbRes = {
  total: number;
  list: ListItem[];
};
export interface FetchCallback {
  (str?: string | number | Record<string, any>): Promise<FetchCbRes>;
}

export interface InnerBaseSelectProps extends SelectProps<any> {
  fetchCallback: FetchCallback; // 请求函数
  value?: string | number;
  deps?: readonly any[];
  debounceWait?: number;
  minWidth?: number;
  width?: number;
  onChangeOption?: (options: any) => void; // 获取
  ready?: boolean;
  mergeOptions?: any[];
  valueKey?: string;
  valueChange?: (value: any, options: any) => void; // value 重新赋值后的回调函数
}

const BaseSelect: FC<InnerBaseSelectProps> = (props) => {
  const {
    value,
    fetchCallback,
    deps = [],
    labelInValue,
    showSearch = true,
    debounceWait = 300, // 请求函数的时间间隔
    filterOption = false, // filterOption 与远程搜索冲突，设置了这个就会屏蔽掉远程搜索
    allowClear = true,
    minWidth = 50,
    width,
    onChangeOption,
    ready,
    onSelect,
    onChange,
    valueKey,
    valueChange,
    ...rest
  } = props;
  const [rawData, setRawdata] = useState<FetchCbRes>({ total: 0, list: [] });
  const ref = useRef(null);
  const valueRef = useRef(null); // 记录上一次的value

  const request = useRequest(
    async (...args) => {
      const res = await fetchCallback(...args);
      return {
        ...res,
        list: res.list.filter((item) => !!item.value),
      } as FetchCbRes;
    },
    {
      refreshDeps: deps,
      ready,
      onSuccess(res: FetchCbRes) {
        if (!value && rawData.list.length === 0 && deps.length === 0) {
          setRawdata(res);
        }
        // deps改变代表做了联动效果，那么rawData需要重新设置
        if (deps.length !== 0 && ref.current !== deps.join('')) {
          setRawdata(res);
        }
        ref.current = deps.join('');
      },
      debounceWait,
    },
  );

  // value 变化的回调
  const handleChange = useCallback(
    (val: any, opt: any = {}) => {
      const valueOptions: any = (request.data?.list || []).find(
        (item: ListItem) => opt.value === item.value,
      );
      if (onChangeOption) {
        onChangeOption(valueOptions);
      }
      if (onSelect) {
        onSelect(val, { ...opt, ...valueOptions });
      }
      if (onChange) {
        onChange(val, { ...opt, ...valueOptions });
      }
    },
    [onChange, onChangeOption, onSelect, request.data?.list],
  );

  const onDropdownVisibleChange = useCallback(async () => {
    if (request.data?.list) {
      request.mutate((oldState) => {
        return { list: concat(oldState.list, rawData.list) };
      });
    }
  }, [rawData.list, request]);

  const onSearch = useCallback(
    (val: string) => {
      if (!val && rawData.list.length) {
        request.mutate(rawData);
        return;
      }
      request.run(val.replace(/(^\s*)|(\s*$)/g, ''));
    },
    [rawData, request],
  );

  const onClear = useCallback(() => {
    handleChange('', {});
  }, [handleChange]);

  const filterValueAndLabel = useMemo(() => {
    const list = request.data?.list || [];
    // 去重 以及重新设置数组格式
    return uniqBy(
      list.map((item: ListItem) => ({
        label: item.label,
        value: item.value,
      })),
      'value',
    );
  }, [request.data?.list]);

  useEffect(() => {
    if (
      valueKey &&
      typeof value !== 'object' &&
      value !== valueRef.current &&
      !filterValueAndLabel.find((item) => item.value === value)
    ) {
      request.runAsync({
        [valueKey]: value,
      });
      valueRef.current = value;
    }
  }, [filterValueAndLabel, request, value, valueKey]);

  useEffect(() => {
    if (valueChange && value && request.data?.list) {
      const valueOptions: any = (request.data?.list || []).find(
        (item: ListItem) => value === item.value,
      );
      valueChange(value, valueOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, request.data?.list]);

  return (
    <Select
      {...rest}
      showSearch={showSearch}
      filterOption={filterOption}
      onSearch={!filterOption ? onSearch : undefined}
      notFoundContent={
        <div style={{ textAlign: 'center' }}>
          {request.loading ? <Spin size="small" tip="加载中..." /> : <div>暂无数据</div>}
        </div>
      }
      onClear={onClear}
      loading={request.loading}
      dropdownMatchSelectWidth={false}
      onDropdownVisibleChange={onDropdownVisibleChange}
      style={{ minWidth, width }}
      options={filterValueAndLabel}
      value={value}
      allowClear={allowClear}
      labelInValue={labelInValue}
      onChange={handleChange}
    />
  );
};

export default BaseSelect;
