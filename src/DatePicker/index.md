---
title: DatePicker
nav:
  title: DatePicker
  path: /components
---

# DatePicker 日期选择框

输入或选择日期的控件。

# 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

# 代码示例

## 基础使用

<code src="./demos/basic.tsx" />

## API

| 参数        | 说明                                 | 类型                  | 是否必须 | 默认值       |
| ----------- | ------------------------------------ | --------------------- | -------- | ------------ |
| value       | 选中的日期                           | Date                  | true     |              |
| onChange    | 选择日期时触发回调函数               | (value: Date) => void | true     |              |
| placeholder | 当没有选中任何日期时，输入框中的内容 | string                | false    | "请选择日期" |
