/**
 *  ProXTable
 *  1. 结合常见的查询 search 和 table
 *  2. 完善的 ts 类型提醒
 *  3. 配置就可以，减少大量重复的代码
 *  4. 按钮权限控制
 *  5. true 或者 false 的字符串的过滤
 *  6. rangePicker 自动设置 value 值
 */

import { Form, Card } from 'antd';
import { useAntdTable } from 'ahooks';
import { useMemo, useRef } from 'react';
// import { Render } from './colMap';
import { transformVals } from './utils';
import { QueryFilter } from '@ant-design/pro-form';
import type { ProXTableProps } from './types';
import {Render} from '../FormRender'
import XTable from '../XTable';

export * from './types';

export const ProTable = (props: ProXTableProps) => {
  const {
    request,
    requestOptions: customRequestOptions,
    columns,
    tableOptions,
    transformValsOptions,
    install,
    queryFormRef,
  } = props;
  // 请求参数里，如果有 hasQueryAuth 那么就代表有查询的按钮权限
  const { hasQueryAuth = true, ...requestOptions } = customRequestOptions || {};

  const [formInstance] = Form.useForm(queryFormRef);
  const formDataOptions = useRef<Record<string, any>>({});
  const formDepsRef = useRef<Record<string, string[]>>({});

  const {
    tableProps,
    search,
    refresh: tableRefresh,
  } = useAntdTable(
    async (pag) => {
      // 没有权限的时候不能请求
      if (!hasQueryAuth) {
        return {
          total: 0,
          list: [],
        };
      }
      const formData = await formInstance.validateFields();
      // 对 value 进行单独处理
      const transformValues = transformVals(formData, transformValsOptions);
      const res = await request({ ...pag, ...transformValues });

      return {
        total: res.total,
        list: res.records,
      };
    },
    {
      defaultPageSize: 30,
      ...requestOptions,
    },
  );

  const initialValues = useMemo(() => {
    // 在 searchField 里设置了 defaultValue 那么就会自动填入默认值
    return columns.reduce((pre, curItem) => {
      if (typeof curItem.searchField === 'object') {
        const searchFiled = curItem.searchField;
        pre[searchFiled?.props?.name || curItem.key || curItem.dataIndex] =
          searchFiled?.props?.defaultValue || searchFiled?.defaultValue;
        // 不要把 props 上的defaultValue 传下去
        Reflect.deleteProperty(searchFiled?.props || {}, 'defaultValue');
      } else if (typeof curItem.searchField === 'function') {
        const formData = formInstance.getFieldsValue();
        const searchFiled = curItem.searchField(
          formData,
          formDataOptions.current,
        );
        pre[searchFiled?.props?.name || curItem.key || curItem.dataIndex] =
          searchFiled?.props?.defaultValue || searchFiled?.defaultValue;
        // 不要把 props 上的defaultValue 传下去
        Reflect.deleteProperty(searchFiled?.props || {}, 'defaultValue');
      }
      return pre;
    }, {} as Record<string, any>);
  }, [columns, formInstance]);

  // 刷新当前页面
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refresh = async () => {
    if (tableRefresh) {
      await tableRefresh({
        current: tableProps.pagination.current,
        pageSize: tableProps.pagination.pageSize,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  // XTable的导出必须要求 columns 每一项 item 要有key
  const newColumns = useMemo(
    () =>
      columns
        .map((item) => {
          if (item.render) {
            const previosRender = item.render;
            item.render = function (...args) {
              return previosRender(...args, refresh);
            };
          }
          return {
            ...item,
            key: item.dataIndex || item.key,
          };
        })
        .filter((item) => !item.searchField?.hideInTable),
    [columns, refresh],
  );

  if (
    tableOptions?.toolbarRender &&
    tableOptions.isCheckbox &&
    !tableOptions.rowSelection
  ) {
    // 如果用户设置了 isCheckbox 和  toolbarRender 并且没有 rowSelection，那么就往 toolbarRender 注入重新刷新页面的参数 tableRefresh
    tableOptions.rowSelection = {};
  }
  return (
    <>
      <Card>
        <QueryFilter
          defaultCollapsed={false}
          form={formInstance}
          onFinish={search.submit}
          initialValues={initialValues}
          submitter={{
            submitButtonProps: {
              style: {
                display: hasQueryAuth ? 'block' : 'none',
              },
            },
          }}
        >
          {columns
            .filter((obj) => obj.searchField)
            .map((item, idx) => (
              // <Render
              //   key={idx.toString()}
              //   renderProps={item.searchField}
              //   key={idx}
              //   formInstance={formInstance}
              //   formDataOptions={formDataOptions}
              //   install={install}
              // />
              <Render
              fileLength={24}
              formDataOptions={formDataOptions}
              formInstance={formInstance}
              renderProps={item.searchField || {}}
              install={install}
              formDeps={formDepsRef}
              key={idx.toString()}
            />
            ))}
        </QueryFilter>
      </Card>
      <XTable
        columns={newColumns}
        {...tableOptions}
        refresh={refresh}
        {...tableProps}
      />
    </>
  );
};

export const ProXTable = (props: Omit<ProXTableProps, 'install'>) => {
  return <ProTable install={{}} {...props} />;
};

export default ProXTable;
