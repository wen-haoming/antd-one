---
nav:
  title: component
order: 1
---

# Button

基于 ant 的 [Button](https://ant-design.gitee.io/components/button-cn/) 组件进行封装，赋予一部分的业务能力。

## 何时使用

- `antd` 中 Button 的 loading 状态需要开发者自己去维护，使用这个组件，仅需要 onClick 的事件中返回一个 Promise，就可以自动设置按钮的 loading 状态。
- 按钮集成了`二次确认`能力，减少编写业务代码的冗余，简化业务处理逻辑。

## 代码演示

```tsx
/**
 * title: 基本
 * desc: Button 的 onClick 事件，返回一个 Promise 即可实现按钮的 loading 加载状态。
 */
import { Button } from '@antd-one/components';
import { Space } from 'antd';

export default () => {
  const requestAsync = () => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <>
      <Space>
        <Button type="primary" loadingText="loading..." onClick={requestAsync}>
          Primary Button
        </Button>
        <Button loadingText="loading..." onClick={requestAsync}>
          Default Button
        </Button>
        <Button
          danger
          type="dashed"
          loadingText="loading..."
          onClick={requestAsync}
        >
          Dashed Button
        </Button>
        <br />
        <Button type="text" loadingText="loading..." onClick={requestAsync}>
          Text Button
        </Button>
        <Button type="link" loadingText="loading..." onClick={requestAsync}>
          Link Button
        </Button>
      </Space>
    </>
  );
};
```

```tsx
/**
 * title: 点击二次确认
 * desc: 只需要设置 `beforeConfirm` 或者 `beforePopConfirm` 就有按钮二次确认的能力。
 */
import { Button } from '@antd-one/components';
import { Space } from 'antd';

export default () => {
  const requestAsync = () => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
  };

  return (
    <Space>
      <Button
        type="primary"
        beforeConfirm={{
          title: '请注意！',
          content: '请问是否提交该表单数据?',
          okText: '确定',
          cancelText: '取消',
        }}
        onClick={requestAsync}
        loadingText="提交中请稍后..."
      >
        Modal confirm 二次确认
      </Button>
      <Button
        beforePopConfirm={{
          title: '请问是否提交该表单数据?',
          okText: '确定',
          cancelText: '取消',
        }}
        onClick={requestAsync}
        loadingText="提交中请稍后..."
      >
        PopConfirm 二次确认
      </Button>
    </Space>
  );
};
```
