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

使用一个 **声明式的结构化对象** 来渲染表单，需要 `install` 去注册对应得组件，然后使用 `fields` 来描述表单信息。

### 一个简单的登录框

<code src="../demo/Demo.tsx"  />

### 一个更为复杂的登录框

<code src="../demo/Demo2.tsx" title="登录框添加字段验证，"  />

### 表单布局

<code title="轻松实现一行多列" src="../demo/Demo3.tsx"  />

### 表单布局

<!-- <code title="fields 默认支持嵌套数组，同一行只需要数组嵌套即可" src="./demo/Demo3.tsx"  /> -->
