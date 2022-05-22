---
order: 3
group:
  title: FormRender
  order: 3
---

# TableFormRender

TableFormRender 实现了 QueryForm 和 Table 的融合，好处是 QueryForm 的字段和 Table 的 columns 融合，大幅降低过去编写代码的复杂度，也就是说**一个组件就可以做完一个查询页面**。

## 为什么

过去的工作中，发现 `QueryForm` 和 `Table` 都是独立的，而且都离不开对方，`TableFormRender`，`QueryForm` 和 `XTable` 的深度融合，数据上把 `Form` 字段定义和查询的 `dataIndex` 深度结合，`只需要一条 columns 定义`，即可展示完整做完，更少的代码量。

以上代码就是常见的查询页面的代码量，通常的步骤是以下

1. 定义 `QueryForm` ，里面写各种 `FormItem` 定义表单字段，还需要考虑联动情况的话要写各种状态控制。
2. 定义一个 `Table` ，编写一个 `columns` 属性。
3. 然后 `QueryFrom` 中的状态属性传给 request 中，然后再把 request 中的结果传给 `Table`，需要 x5 已经有 useXTable 或 useAntTable 来解耦翻页逻辑，这么好用的 hooks，但远远不够。
4. 如果页面涉及 `Table` 列的多选操作，还额外定义 useState 去存放 SelectRow 的状态。
5. jsx 的特点就是灵活，这就导致**每个人的写法难以统一，对于部分代码难以理解和维护**。

## 代码演示


### 基础使用

<code src="./demo/Demo1.tsx" />

### 查询表单联动

### 配合 XTable 下多选操作
