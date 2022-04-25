---
title: ColorPicker
nav:
  title: ColorPicker
  path: /components
---

# ColorPicker 颜色选择器

color 颜色选择器

# 何时使用

用户需要选择颜色

# 代码示例

## 基础实用

<code src="./demos/basic.tsx" />

## API

| 参数     | 说明                                    | 类型                    | 是否必须 | 默认值 |
| -------- | --------------------------------------- | ----------------------- | -------- | ------ |
| value    | 选择的颜色                              | string                  | true     |        |
| onChange | 当用户点击确定时 更新选中颜色的回调函数 | (value: string) => void | true     |        |
