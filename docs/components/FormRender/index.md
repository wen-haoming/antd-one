---
nav:
  title: component
order: 5
toc: content
demo:
  cols: 2
---

# FormRender

## 何时使用

## 代码演示

```tsx | pure
import { FormRender } from '@antd-one/components';

export default () => (
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
```

### 基础使用

```tsx 
import { FormRender } from '@antd-one/components';

export default () => (
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
```

### 提交按钮

<code src="./submit.tsx">提交按钮</code>


### 布局案例

<code src="./FormRenderLayoutGrid.tsx">表单布局</code>

### ArrayTabs

<code src="./ArrayTabs.tsx">ArrayTabs</code>

