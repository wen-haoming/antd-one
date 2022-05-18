---
group:
  title: 常用组件
  order: 1
---
# SearchSelect（建设中~）

基于 ant 的 [select](https://ant-design.gitee.io/components/select-cn/) 组件进行封装，赋予一部分的业务能力。

## 何时使用

远程搜索下拉的组件，在 antd 中的 `Select` 组件提供非常多的功能，但是如果如果直接使用会需要一定的封装成本，该组件提供了一系列远程搜索的功能，让使用者能够直接使用。

- 首页列表缓存
- 下拉列表的多字段显示（modal 弹窗）
- 远程数据的回显
- 下拉列表自动加载

## 代码演示

```tsx
/**
 * title: 基本
 * desc: 自动请求
 */
import React from 'react';
import SearchSelect from './SearchSelect';
import 'antd/es/select/style/index.css';

const request = async (params) => {
  if (typeof params !== 'object' && params !== undefined) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          total: 1,
          list: Array(1)
            .fill('')
            .map((item, idx) => ({
              label: `${params}-${idx + 1}`,
              value: params + Math.random().toString(16).slice(2),
            })),
        });
      }, 300);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 150,
        list: Array(150)
          .fill('')
          .map((item, idx) => ({ label: `item-${idx + 1}`, value: idx + 1 })),
      });
    }, 300);
  });
};

export default () => {
  return (
    <SearchSelect
      request={request as any}
      modalConfig={{ title: 'abc', columns: [] }}
      style={{ width: 200 }}
    />
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
