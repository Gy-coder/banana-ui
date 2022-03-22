---
title: Select
nav:
  title: Select
  path: /components
---

# Select 选择器

下拉选择器。

# 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。

- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

# 代码演示

## 基础使用

<code src="./demos/basic.tsx" />

## 选择器禁用

<code src="./demos/disabled.tsx" />

## 多选

<code src="./demos/multiple.tsx" />

## Select API

| 参数      | 说明         | 类型                                              | 是否必须 | 默认值 |
| --------- | ------------ | ------------------------------------------------- | -------- | ------ |
| value     | 选中的值     | string ｜ string[]                                | true     |        |
| onChange  | 选中的值     | onChange: (newValue: string ｜ string[]) => void; | true     |        |
| multiple  | 是否支持多选 | boolean                                           | false    | false  |
| disabled  | 是否禁用     | boolean                                           | false    | false  |
| className | 自定义       | string                                            | false    |        |
| style     | 自定义样式   | React.CSSProperties                               | false    |        |

## Option API

| 参数     | 说明         | 类型    | 是否必须 | 默认值 |
| -------- | ------------ | ------- | -------- | ------ |
| value    | 选项的值     | string  | true     |        |
| disabled | 选项是否禁用 | boolean | false    | false  |
