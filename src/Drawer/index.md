---
title: Drawer
nav:
  title: Drawer
  path: /components
---

# Drawer

屏幕边缘滑出的浮层面板。

# 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。

- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

# 代码范例

## 基础使用

<code src="./demos/basic.tsx" />

<code src="./demos/dontShowMask.tsx" />

## API

| 参数         | 说明                                       | 类型                                   | 是否必须 | 默认值        |
| ------------ | ------------------------------------------ | -------------------------------------- | -------- | ------------- |
| visible      | 是否显示抽屉                               | boolean                                | true     |               |
| onClose      | 关闭函数                                   | ()=> void                              | true     |               |
| closeable    | 抽屉是否可以关闭                           | boolean                                | false    | true          |
| container    | 抽屉挂载的节点，false 为挂载在当前 dom     | HTMLElement ｜ false;                  | false    | document.body |
| placement    | 抽屉的方向                                 | "top" ｜ "left" ｜ "bottom" ｜ "right" | false    | "right"       |
| height       | 高度, 在 placement 为 top 或 bottom 时使用 | number                                 | false    | 384           |
| width        | 宽度 在 placement 为 left 或 right 时使用  | number                                 | false    | 384           |
| zIndex       | 抽屉的 z-index 值                          | nubmer                                 | false    | 1000          |
| showMask     | 是否显示遮罩层                             | boolean                                | false    | true          |
| maskClosable | 点击遮罩层是否可以关闭抽屉                 | boolean                                | false    | true          |
| title        | 标题                                       | ReactNode                              | false    |               |
| footer       | 抽屉的页脚                                 | ReactNode                              | false    |               |
| headerStyle  | 用于设置 Drawer 头部的样式                 | CSSProperties                          | false    |               |
| mainStyle    | 用于设置 Drawer 主区域的样式               | CSSProperties                          | false    |               |
| footerStyle  | 抽屉页脚部件的样式                         | CSSProperties                          | false    |               |
