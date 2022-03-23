---
title: Image
nav:
  title: Image
  path: /components
---

# Image

可预览的图片。

# 何时使用

- 需要展示图片时使用。

- 加载大图时显示 loading 或加载失败时容错处理。

# 代码示例

## 显示图片

<code src="./demos/basic.tsx" />

## 错误处理

<code src="./demos/error.tsx" />

## API

| 参数      | 说明                 | 类型          | 是否必须 | 默认值 |
| --------- | -------------------- | ------------- | -------- | ------ |
| src       | 图片的地址           | string        | false    |        |
| width     | 图片的宽度           | number        | false    |        |
| fallback  | 加载失败时的替代图片 | string        | false    |        |
| className | Image 组件的类名     | string        | false    |        |
| style     | Image 组件的样式     | CSSProperties | false    |        |
