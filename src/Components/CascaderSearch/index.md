---
group:
  title: 常用组件
  order: 1
---

# CascaderSearch（建设中~）

`antd` 中的级联组件天然不支持层级的远程搜索，但是会有这样的场景存在。

## 代码演示

```tsx
/**
 * title: 基本
 * desc: Button 的 onClick 事件，返回一个 Promise 即可实现按钮的 loading 加载状态。
 */
import React from 'react';
import { CascaderSearch } from 'antd-one';
import 'antd/dist/antd.css';

export default () => {
  return <CascaderSearch />;
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
