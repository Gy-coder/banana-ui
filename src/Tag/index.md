---
title: Tag
nav:
  title: Tag
  path: /components
---

# Tag 标签

进行标记和分类的小标签。

# 何时使用

- 用于标记事物的属性和维度。

- 进行分类。

# 代码演示

## 基础使用

<code src="./demos/basic.tsx" />

## API

| 参数      | 说明             | 类型                            | 是否必须 | 默认值 |
| --------- | ---------------- | ------------------------------- | -------- | ------ |
| color     | 标签的背景颜色   | string                          | false    |        |
| closeable | 标签是否可以关闭 | boolean                         | false    | false  |
| onClose   | 关闭时的回调函数 | (e?: React.MouseEvent) => void; | false    |        |
| className | 自定义标签类名   | string                          | false    |        |
| style     | 自定义标签样式   | React.CSSProperties             | false    |        |
