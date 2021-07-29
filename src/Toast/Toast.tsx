import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import './Toast.scss';

interface Props {
  /**
   * @description 是否显示Toast
   */
  visible: boolean;
  /**
   * @description Toast关闭函数
   */
  close: () => void;
  /**
   * @description 是否自动关闭
   * @default false
   */
  autoClose?: boolean;
  /**
   * @description 自动关闭延时
   * @default 3
   */
  autoCloseDelay?: number;
  /**
   * @description 关闭之后的回调函数
   */
  afterClose?: () => void;
  /**
   * @description Toast出现的位置
   * @default     top
   */
  position?: 'top' | 'middle' | 'bottom';
  /**
   * @description 关闭按钮 text为按钮文本 callback为点击后的回调函数 如果autoClose为false则需要一个closeButton
   */
  closeButton?: { text: ReactNode; callback?: Function };
  /**
   * @description Toast的类名
   */
  className?: string;
  /**
   * @description Toast的CSS
   */
  style?: React.CSSProperties;
}

const Toast: React.FC<Props> = (props) => {
  const {
    children,
    visible,
    close,
    autoClose = false,
    autoCloseDelay = 3,
    afterClose,
    position = 'top',
    closeButton,
    className,
    style,
  } = props;
  const toast = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const classes = classnames('g-toast', className, {
    [`g-toast-${position}`]: position,
  });
  useEffect(() => {
    execAutoClose();
    updateStyle();
  });
  const execAutoClose = () => {
    let id: NodeJS.Timer;
    if (autoClose) {
      id = setTimeout(() => {
        close();
        if (afterClose) afterClose();
      }, autoCloseDelay * 1000);
    }
    return () => {
      id && clearTimeout(id);
    };
  };
  const updateStyle = () => {
    if (line.current) {
      line.current.style.height = `${
        toast.current?.getBoundingClientRect().height
      }px`;
    }
  };
  const onClickCloseButton = () => {
    close();
    closeButton && closeButton.callback && closeButton.callback();
    afterClose && afterClose();
  };
  const content = visible ? (
    <div className={classes} ref={toast} style={style}>
      {children}
      {closeButton && (
        <>
          <div className="line" ref={line} />
          <div onClick={() => onClickCloseButton()} className="g-toast-close">
            {closeButton.text}
          </div>
        </>
      )}
    </div>
  ) : null;
  return content;
};

export default Toast;

export const showToast = (
  message: ReactNode,
  object?: Omit<Props, 'visible'> & Omit<Props, 'close'>,
) => {
  const close = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    div && ReactDOM.unmountComponentAtNode(div);
    div && div.remove();
    object && object.afterClose && object.afterClose();
  };
  const component = (
    <Toast visible close={close} {...object}>
      {message}
    </Toast>
  );
  const div = document.createElement('div');
  div.id = 'g-toast-wrapper';
  document.body.appendChild(div);
  ReactDOM.render(component, div);
  return close;
};
