import type { ColumnsType } from 'antd/es/table';
import type { XTable } from '../XTable';
import type { FormInstance } from 'antd/es/form';
import type { TransformValsOptions } from './utils';
import type { ReactNode } from 'react';

type Options = {}

export type Request = (params: {
  current: number;
  pageSize: number;
  [key: string]: any;
}) => Promise<any>;

type Install = Record<string, (...args: any) => any>;
export interface ProXTableProps {
  columns: ProColumnsItems<any>;
  request: Request;
  requestOptions?: Options<any, any> & { hasQueryAuth?: boolean }; // 请求options
  tableOptions?: Omit<Parameters<typeof XTable>[0], 'toolbarRender'> & {
    isCheckbox?: boolean;
    toolbarRender?: (refresh: () => void, rowKeys: string[], rows: any[]) => ReactNode;
  };
  transformValsOptions?: TransformValsOptions; // value 的转换规则
  install: Record<string, any>;
  queryFormRef?: FormInstance
}

export type ProXTableColumns = ProXTableProps['columns'];

export type SearchField<T extends Install> = {
  // 如果指定了改条件那么就会有对应
  type: keyof T;
  props?: Parameters<T[SearchField<T>['type']]>[0];
  hideInTable?: boolean; // 在 Table 中不展示此列
  hideInSearch?: boolean; // 不展示在搜索框里
  dependencies?: string[]; // 相当于依赖表单某项
};

export type SearchFieldFunc<T extends Install> = (
  formData: any,
  formDataOptions: Record<string, any>,
  formInstance: FormInstance,
) => SearchField<T>;

export interface ColumnsTypeItem<T extends Install> {
  searchField?: SearchField<T> | SearchFieldFunc<T>;
}

export type ColumnItem<T extends Install> = ColumnsType<ColumnsTypeItem<T>>[number] & {
  dataIndex: string; // columns 的字段
  title: string;
  key?: string | ((searchForm: any, SearchFormOptions?: any) => string); // search 搜索 key 的字段，如果不设置 搜索情况下和 dataIndex 相同
  render?: (value: any, record: any, index: number, refresh: () => void) => any;
} & ColumnsTypeItem<T>;

export type ProColumnsItems<T extends Install> = (ColumnItem<T> & { dataIndex?: string })[];
