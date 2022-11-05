<!-- ---
order: 5
---

# ModalFormRender

基于 [formily 的 FormDialog](https://antd.formilyjs.org/zh-CN/components/form-dialog)  封装, 基础的弹窗表单组件，弹窗表单组件使用**函数执行**的方式来打开渲染弹窗节点，好处是性能好，过去的弹窗组件没打开的时候已经触发了弹窗内部表单的渲染，造成不必要的渲染，并且借助 formily 的强大数据模型，对于复杂的表单交互场景显得非常容易。

## 何时使用

弹窗中有表单的时候使用

## 代码演示

### 基础使用

```tsx
import React from 'react'
import { DatePicker, Input, Select } from '@formily/antd'
import { Button ,Space} from 'antd'
import { createModalFormRender } from 'antd-one';

const install = { Input, Select, RangePicker: DatePicker.RangePicker }

const Modal = createModalFormRender<typeof install>(install)

export default () => {
  return (
    <Space>
      <Modal.Portal >
      <Button onClick={() => {
        Modal({
          title: '打开表单',
        }, {
          fields: () => [
            {
              type: 'Input',
              name: 'input',
              title: 'input'
            },
          ]
        }).open().then(res=>{
          console.log(res,'++')
        });
      }}>打开</Button>
    </Modal.Portal>
    </Space>
  )
}


``` -->
