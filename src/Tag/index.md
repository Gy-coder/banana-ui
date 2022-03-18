---
title: Tag
nav:
  title: Tag
  path: /components
---

# Affix

将页面元素钉在可视范围。

# 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。

# 代码演示

## 基础使用

<code src="./demos/basic.tsx" />

## API

| 参数      | 说明                             | 类型                | 是否必须 | 默认值 |
| --------- | -------------------------------- | ------------------- | -------- | ------ |
| distance  | 距离窗口顶部达到指定偏移量后触发 | number              | false    | 0      |
| className | 自定义固钉容器类名               | string              | false    |        |
| style     | 自定义固钉容器样式               | React.CSSProperties | false    |        |
