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
import { createFormRender } from '@antd-one/components';
import { DatePicker, Input, Select } from '@formily/antd';

const install = { Input, Select, RangePicker: DatePicker.RangePicker };

const FormRender = createFormRender(install);

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
