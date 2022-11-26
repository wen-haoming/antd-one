---
nav:
  title: component
order: 3
toc: content
---

# ProTable

## 何时使用

`ProTable` 在 XTable 的基础上集成了请求逻辑，简化了过去需要手动管理页码以及加载状态等逻辑，

## 代码演示

### 基础请求

只需要传入一个 request 的请求函数即可完成一个列表的查询，翻页，控制页操作

```tsx
/**
 * demo:
 *  cols: 2
 */
import { ProTable } from '@antd-one/components';
import React from 'react';

export default () => {
  return (
    <ProTable
      env="test"
      request={async () => {
        return new Promise((r) => {
          const records = Array(30)
            .fill('')
            .map((item, id) => ({
              id: id,
              name: 'name',
              age: 'age',
              address: 'address',
            }));
          setTimeout(() => {
            r({
              list: records,
              total: 1000,
            });
          }, 300);
        });
      }}
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ]}
      defaultHeight={300}
    />
  );
};
```

由于 request 是默认加载，有时候在外部需要控制 request 的上下文，只需要使用 ProTable.useTable 的静态方法即可

```tsx
import { ProTable } from '@antd-one/components';
import { Button, Space } from 'antd';
import React from 'react';

export default () => {
  const [table] = ProTable.useTable();

  return (
    <>
      <Space style={{ marginBottom: 5 }}>
        <Button
          type="primary"
          onClick={() => {
            table.tableRequestInstance.search.submit();
            console.log('table', table);
          }}
        >
          手动触发请求
        </Button>
        <Button
          type="primary"
          onClick={() => {
            table.tableRequestInstance.refresh();
          }}
        >
          当前页刷新
        </Button>
      </Space>
      <ProTable
        table={table}
        requestOptions={{
          manual: true,
        }}
        request={async () => {
          return new Promise((r) => {
            const records = Array(30)
              .fill('')
              .map((item, id) => ({
                id: id,
                name: 'name',
                age: 'age',
                address: 'address',
              }));
            setTimeout(() => {
              r({
                list: records,
                total: 1000,
              });
            }, 300);
          });
        }}
        columns={[
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
        ]}
        defaultHeight={300}
      />
    </>
  );
};
```
