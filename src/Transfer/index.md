---
title: Transfer
nav:
  title: Transfer
  path: /components
---

# Transfer 穿梭框

双栏穿梭选择框。

# 何时使用

- 需要在多个可选项中进行多选时。

- 比起 Select 和 TreeSelect，穿梭框占据更大的空间，可以展示可选项的更多信息。

穿梭选择框用直观的方式在两栏中移动元素，完成选择行为。

选择一个或以上的选项后，点击对应的方向键，可以把选中的选项移动到另一栏。其中，左边一栏为 source，右边一栏为 target，API 的设计也反映了这两个概念。

# 代码示例

## 基础使用

<code src="./demos/basic.tsx" />

## 具有别名的 data

<code src="./demos/otherName.tsx" />

## DateItem

```typescript
export type DataItem = {
  key: Key;
  label: string;
  disabled: boolean;
};
```

## Props

```typescript
export type Props = {
  key: string;
  label: string;
  disabled: string;
};
```

## Key

```typescript
export type Key = string | number;
```

## API

| 参数               | 说明                           | 类型                                            | 是否必须 | 默认值                                               |
| ------------------ | ------------------------------ | ----------------------------------------------- | -------- | ---------------------------------------------------- |
| data               | Transfer 的数据                | DataItem[]                                      | true     |                                                      |
| modelValue         | 被选中的数据的 key             | Key[]                                           | true     |                                                      |
| onModelValueChange | 当 modelValue 改变时的回调函数 | onChangeModelValue: (modelValue: Key[]) => void | true     |                                                      |
| props              | 数据的别名                     | Props                                           | false    | { key: 'key', label: 'label', disabled: 'disabled' } |
