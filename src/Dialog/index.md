---
title: Dialog
nav:
  title: Dialog
  path: /components
---

# Dialog

对话框

# 何时使用

- 需要用户处理事务，又不希望跳转页面以致打断工作流程时

- banana-ui 提供了 modal、alert、confirm 三种不同的对话框

# 代码范例

## 基础使用

<code src="./demos/basic.tsx" />

## alert

<code src="./demos/alert.tsx" />

## modal

<code src="./demos/modal.tsx" />

## comfirm

<code src="./demos/confirm.tsx" />

<API src="./Dialog.tsx" />

## 函数 API

#### modal

|       Name       |    Description     |      Type      |  Default   |
| :--------------: | :----------------: | :------------: | :--------: |
|     content      |    弹出层的内容    |   ReactNode    | (required) |
|     buttons      |  modal 底部的按钮  | ReactElement[] |     []     |
|    afterClose    |  关闭后的回调函数  |   () => void   |   ()=>{}   |
|      title       |    modal 的标题    |     string     |   '提示'   |
| closeOnClickMask | 点击遮罩层是否关闭 |    boolean     |   false    |

#### alert

|       Name       |    Description     |   Type    |  Default   |
| :--------------: | :----------------: | :-------: | :--------: |
|     content      |    弹出层的内容    | ReactNode | (required) |
|      title       |    modal 的标题    |  string   |   '提示'   |
| closeOnClickMask | 点击遮罩层是否关闭 |  boolean  |   false    |

## confirm

|       Name       |      Description       |    Type    |  Default   |
| :--------------: | :--------------------: | :--------: | :--------: |
|     content      |      弹出层的内容      | ReactNode  | (required) |
|     success      | 点击确认按钮的回调函数 | ()=> void  |   ()=>{}   |
|    afterClose    |   点击取消的回调函数   | () => void |   ()=>{}   |
|      title       |      modal 的标题      |   string   |   '提示'   |
| closeOnClickMask |   点击遮罩层是否关闭   |  boolean   |   false    |
