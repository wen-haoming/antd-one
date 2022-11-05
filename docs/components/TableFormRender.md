---
nav:
  title: component
order: 4
---

# TableFormRender

基于 formily 封装基础的表单查询组件

## 何时使用

过去一个表单查询页面需要编写一个 QueryForm + Table 这样的金刚组合，然后额外需要管理表单的字段的状态以及翻页的逻辑 `XTableFormRender`，把表单的字段 与 `Table` 的 columns 结合，使用起来只需要操作一个数据结构 columns 即可，请求只需要传入一个属性 `request` 即可完成。

## 代码演示

### 基础使用

```tsx
import { createTableFormRender } from '@antd-one/components';
import { Input, Select } from '@formily/antd';
import React from 'react';

const install = { Input, Select };

const TableFormRender = createTableFormRender(install);

export default () => {
  return (
    <TableFormRender
      install={install}
      request={async (val, values) => {
        console.log(val, values);
      }}
      columns={[
        {
          title: 'abc',
          dataIndex: 'abc',
          searchField: {
            type: 'Input',
            name: 'input',
            title: 'input',
          },
        },
        {
          title: 'abcd',
          dataIndex: 'abcd',
          searchField: {
            type: 'Select',
            required: true,
            props: {
              options: [
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 },
              ],
            },
          },
        },
      ]}
    />
  );
};
```
