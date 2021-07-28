---
title: Button
nav:
  title: 基础组件
  path: /components
---

# Button

按钮一般用于点击触发一个操作

# 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 banana-ui 中我们提供了三种按钮。

- 默认按钮：用于没有主次之分的一组行动点。

- 文本按钮：用于最次级的行动点。

- 链接按钮：用于作为外链的行动点。

提供了大中小三个不同的尺寸的按钮

以及四种状态属性与上面配合使用。

- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。

- 主按钮: 用于主行动点，一个操作区域只能有一个主按钮。

- 禁用：行动点不可用的时候，一般需要文案解释。

- 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

# 代码演示

<code src="./demos/basic.tsx" />
<code src="./demos/size.tsx" />
<code src="./demos/level.tsx" />
<code src="./demos/disabled.tsx">
<code src="./demos/loading.tsx" />

<API src="./Button.tsx"/>
