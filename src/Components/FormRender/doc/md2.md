---
order: 2
group:
  title: FormRender
  order: 2
---

# FormRender

## 何时使用

降低编写 `Form` 的代码量同时更好的代码维护，提供更多的预设场景（比如校验规则，组件，布局，交互，数据处理），也为低代码实践打下坚实基础。

## 代码演示

使用一个 **声明式的结构化对象** 来渲染表单，直接使用 `fields` 来描述表单信息，每一块表单都是一个 [field](/components/form-render/doc/md2#field) 来表示。

### 一个简单的登录框

<code src="../demo/Demo.tsx"  />

### 一个更为复杂的登录框

<code src="../demo/Demo2.tsx" title="登录框添加字段验证，"  />

### 表单布局

<code title="轻松实现一行多列" src="../demo/Demo3.tsx"  />

### 组件联动

在 FormRender 中，组件联动也是非常得简单，只需要表单中对应的 field 变为一个函数即可。

<code title="组件联动仅需要field变成函数，即可获取上下文环境" src="../demo/Demo4.tsx"  />

### 内置组件

<code  src="../demo/Demo5.tsx"  />



### 各种内置组件

<!-- <code title="fields 默认支持嵌套数组，同一行只需要数组嵌套即可" src="./demo/Demo3.tsx"  /> -->


### Props

| 参数             | 描述                                                | 类型    | 默认值 |
| ---------------- | --------------------------------------------------- | -------------- |  --- |
| layout           | 表单布局                  | 	`horizontal` \| `vertical` \| `inline` |  `inline` |  
| fields           | 表单域 | `(Field \| (formData,formDataOpts,formInstance)=>Field \| (Field \| (formData,formDataOpts,formInstance)=>Field)[])[]` | [] |
| onFinish | 表单提交方法 | `(values: any, valuesOpts: any) => void;` | - |
| onValuesChange | 字段值更新时触发回调事件	 | `(changedValues: any, values: any, valuesOpts: any) => void;` | - |
| form | 经 `FormRender.useForm()` 创建的 form 控制实例，不提供时会自动创建	| [formInstance](https://ant.design/components/form-cn/#FormInstance) | - |
| install | 自定义组件注册 |  `Record<string, Field \| (formData,formDataOpts,formInstance)=>Field>` | - |
| initialValues | 表单默认值，只有初始化以及重置时生效 | `object` | -|


### Field 

| 参数 | 描述 | 类型 | 默认值|
| --- | --- | --- | --- |
| type | 支持自定义组件，支持内置组件| `string \| React.FunctionComponent \| React.ClassicComponent` | - |
| props | 字段属性，字段会传递给 [formItem](https://ant.design/components/form-cn/#Form.Item) 的字段， 其中有 `fieldProps 的对象字段`会传递至组件内部 | object | - | 
| render | 渲染自定义组件 | [ColProps](https://ant.design/components/grid-cn/#Col) | - | 
| required | 是否必填 | `boolean` | false |


