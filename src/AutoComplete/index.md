---
title: AutoComplete
nav:
  title: AutoComplete
  path: /components
---

# AutoComplete

输入框自动完成功能。

# 何时使用

需要一个输入框而不是选择器。

需要输入建议/辅助提示。

和 Select 的区别是：

- AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助输入。

- Select 是在限定的可选项中进行选择，关键词是选择。

# 代码演示

## 基础使用

<code src="./demos/basic.tsx" />

## 非块级用法

<code src="./demos/width.tsx" />

## 自定义渲染

<code src="./demos/renderOption.tsx" />

## 支持异步获取

<code src="./demos/async.tsx" />

## 参数类型

| 类型           | 值                                                 |
| -------------- | -------------------------------------------------- |
| DataSourceType | type DataSourceType<T = {}> = T & DataSourceObject |

## API

| 参数             | 说明                                  | 类型                                                           | 是否必须 | 默认值 |
| ---------------- | ------------------------------------- | -------------------------------------------------------------- | -------- | ------ |
| value            | 输入框内的值                          | string                                                         | false    |        |
| onChange         | 当输入框内容改变时的回调函数          | (value: string) => void                                        | false    |        |
| block            | AutoComplete 是否为块级元素           | boolean                                                        | false    | true   |
| fetchSuggestions | 搜索补全项的时候调用                  | (str: string) => DataSourceType[] ｜ Promise<DataSourceType[]> | true     |        |
| onSelect         | 被选中时调用，参数为选中项的 value 值 | (item: DataSourceType) => void                                 | false    |        |
| renderOption     | 自定义渲染下拉选项                    | (item: DataSourceType) => ReactElement                         | false    |        |
