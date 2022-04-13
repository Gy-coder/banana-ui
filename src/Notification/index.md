---
title: Notification
nav:
  title: Notification
  path: /components
---

# Notification 通知提醒框

全局展示通知提醒信息

# 何时使用

在系统四个角显示通知提醒信息。经常用于以下情况：

较为复杂的通知内容。

带有交互的通知，给出用户下一步的行动点。

系统主动推送。

# 代码示例

## 基础使用

<code src="./demos/basic.tsx" />

<code src="./demos/types.tsx" />

## API

Notification.open 函数中 config 对象的参数

| 参数    | 说明                                              | 类型                                                                        | 是否必须 | 默认值              |
| ------- | ------------------------------------------------- | --------------------------------------------------------------------------- | -------- | ------------------- |
| time    | Notification 组件停留的时间，0 表示不会被自动删除 | number                                                                      | false    | 5                   |
| title   | Notification 的标题                               | ReactNode                                                                   | true     |                     |
| content | Notification 的内容                               | ReactNode                                                                   | true     |                     |
| type    | Notification 的类型                               | <code> normal &#124; success &#124; error &#124; info &#124; warning</code> | false    | <code>normal</code> |
