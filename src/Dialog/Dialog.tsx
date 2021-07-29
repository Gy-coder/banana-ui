import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import './Dialog.scss';
import Button from '../Button/Button';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  /**
   * @description 是否显示对话框
   */
  visible: boolean;
  /**
   * @description 对话框的标题
   * @default     提示
   */
  title?: string;
  /**
   * @description 对话框的类名
   */
  className?: string;
  /**
   * @description 对话框底部的按钮
   */
  buttons?: ReactElement[];
  /**
   * @description 关闭函数
   */
  onClose: React.MouseEventHandler;
  /**
   * @description 点击遮罩层是否关闭
   * @default     false
   */
  closeOnClickMask?: boolean;
}

const Dialog: React.FC<Props> = (props) => {
  const {
    visible,
    title = '提示',
    children,
    className,
    buttons,
    onClose,
    closeOnClickMask = true,
  } = props;
  const classes = classnames('g-dialog', className);
  const onClickClose = (e: React.MouseEvent) => {
    onClose(e);
  };
  const onClickMask = (e: React.MouseEvent) => {
    closeOnClickMask && onClickClose(e);
  };
  const content = visible ? (
    <>
      <div className="g-dialog-mask" onClick={onClickMask} />
      <div className={classes}>
        <div className="g-dialog-close" onClick={onClickClose}>
          <AiOutlineClose className="g-icon" />
        </div>
        <header className="g-dialog-header">{title}</header>
        <main className="g-dialog-content">{children}</main>
        {buttons && buttons.length > 0 && (
          <footer className="g-dialog-footer">{buttons}</footer>
        )}
      </div>
    </>
  ) : null;
  return ReactDOM.createPortal(content, document.body);
};

export default Dialog;

export const modal = (
  content: ReactNode,
  buttons?: ReactElement[],
  afterClose?: () => void,
  title?: string,
  closeOnClickMask?: boolean,
) => {
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  };
  const component = (
    <Dialog
      visible
      title={title}
      onClose={() => {
        onClose();
        afterClose && afterClose();
      }}
      buttons={buttons}
      closeOnClickMask={closeOnClickMask}
    >
      {content}
    </Dialog>
  );
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(component, div);
  return onClose;
};

export const alert = (
  content: ReactNode,
  title?: string,
  closeOnClickMask?: boolean,
) => {
  const close = modal(
    content,
    [
      <Button level="main" key={1} onClick={() => close()}>
        OK
      </Button>,
    ],
    () => {},
    title,
    closeOnClickMask,
  );
};

export const confirm = (
  content: ReactNode,
  success?: Function,
  fail?: Function,
  title?: string,
  closeOnClickMask?: boolean,
) => {
  const onSuccess = () => {
    close();
    success && success();
  };
  const onFail = () => {
    close();
    fail && fail();
  };
  const buttons = [
    <Button level={'main'} key={1} onClick={onSuccess}>
      确认
    </Button>,
    <Button key={2} onClick={onFail}>
      取消
    </Button>,
  ];
  const close = modal(content, buttons, onFail, title, closeOnClickMask);
};
