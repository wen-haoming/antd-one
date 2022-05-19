import type { ColumnsType } from 'antd/es/table';
import type { XTable } from '../XTable';
import type { FormInstance } from 'antd/es/form';
import type { TransformValsOptions } from './utils';
import type { ReactNode } from 'react';
import type { Field, FieldFunc } from '../FormRender/types';

export type Request = (params: {
  current: number;
  pageSize: number;
  [key: string]: any;
}) => Promise<any>;

export interface TableFormRenderProps {
  columns: ProColumnsItems;
  request: Request;
  requestOptions?: any;
  tableOptions?: Omit<Parameters<typeof XTable>[0], 'toolbarRender'> & {
    isCheckbox?: boolean;
    toolbarRender?: (refresh: () => void, rowKeys: string[], rows: any[]) => ReactNode;
  };
  transformValsOptions?: TransformValsOptions; // value 的转换规则
  install?: Record<string, any>;
  form?: FormInstance;
}

export type TableFormRenderColumns = TableFormRenderProps['columns'];

export interface ColumnsTypeItem {
  searchField?: Field | FieldFunc;
}

export type ColumnItem = ColumnsType<ColumnsTypeItem>[number] & {
  dataIndex: string; // columns 的字段
  title: string;
  key?: string | ((searchForm: any, SearchFormOptions?: any) => string); // search 搜索 key 的字段，如果不设置 搜索情况下和 dataIndex 相同
  render?: (value: any, record: any, index: number, refresh: () => void) => any;
} & ColumnsTypeItem;

export type ProColumnsItems = (ColumnItem & { dataIndex?: string })[];
