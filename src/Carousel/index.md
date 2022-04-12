---
title: Carousel
nav:
  title: Carousel
  path: /components
---

# Carousel

旋转木马，一组轮播的区域。

# 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

# 代码演示

## 基础使用

<code src="./demos/basic.tsx" />

## 不自动播放

<code src="./demos/notAutoPlay.tsx" />

## API

| 参数      | 说明               | 类型          | 是否必须 | 默认值 |
| --------- | ------------------ | ------------- | -------- | ------ |
| time      | 轮播切换的时间     | number        | false    | 3      |
| autoPlay  | 是否自动轮播       | boolean       | false    | true   |
| className | 轮播外层容器的类名 | string        | false    |        |
| style     | 轮播外层容器的样式 | CSSProperties | false    |        |
