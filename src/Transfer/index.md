---
title: Transfer
nav:
  title: Transfer
  path: /components
---

# Transfer 穿梭框

简单的文字提示气泡框。

# 何时使用#

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

# 代码示例

## 基础使用

<code src="./demos/basic.tsx" />

## API

| 参数      | 说明                 | 类型                                                             | 是否必须 | 默认值             |
| --------- | -------------------- | ---------------------------------------------------------------- | -------- | ------------------ |
| content   | tooltip 文字提示内容 | string                                                           | true     |                    |
| placement | tooltip 的方向       | <code> 'top' &#124; 'left' &#124; 'bottom' &#124; 'right'</code> | false    | <code>'top'</code> |
