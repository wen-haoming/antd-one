---
nav:
  title: component
order: 5
toc: content
---

# FormRender

## 何时使用

## 代码演示

### 基础使用

```tsx
import React from 'react';
import { FormRender } from '@antd-one/components';

export default () => {
  return (
    <FormRender
      fields={[
        {
          type: 'Input',
          name: 'Input',
          title: 'Input',
        },
      ]}
    />
  );
};
```
