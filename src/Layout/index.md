---
title: Layout
nav:
  title: Layout
  path: /components
---

# Layout 布局

协助进行页面级整体布局。

# 何时使用

需要对页面进行布局时

# 组件概述

- Layout：布局容器，其下可嵌套 Header Sider Content Footer 或 Layout 本身，可以放在任何父容器中。

- Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

- Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。

- Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

- Footer：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

# 代码示例

## 不带有 Sider

<code src="./demos/basic.tsx" />

## Sider 在 Content 区域左边

<code src="./demos/basic2.tsx" />

## Sider 在 Content 区域右边

<code src="./demos/basic3.tsx" />

## Sider 在 Main 区域

<code src="./demos/basic4.tsx" />
