---
group:
  title: 常用组件
  order: 1
---

# DateTimeSelect（建设中~）

有一部场景在于选择某一天后，再选择这一天里的时间区间的需求

## 何时使用

- 选择某一天后再继续改天的时间范围

## 代码演示

```tsx
/**
 * title: 基本
 * desc: Button 的 onClick 事件，返回一个 Promise 即可实现按钮的 loading 加载状态。
 */
import React from 'react';
import { Space } from 'antd';
import { DateTimeSelect } from 'antd-one';
import 'antd/dist/antd.css';

export default () => {
  return <DateTimeSelect />;
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo