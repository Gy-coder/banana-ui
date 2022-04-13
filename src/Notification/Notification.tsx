import React, { FC, useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Notification.scss';
import {
  CloseCircleOutlined,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  InfoCircleTwoTone,
} from '@ant-design/icons';

//@ts-ignore
const map: { [K: NotificationProps['type']]: ReactNode | undefined } = {
  error: <CloseCircleTwoTone style={{ color: '#ff4d4f' }} />,
  success: <CheckCircleTwoTone style={{ color: '#52c41a' }} />,
  warning: <InfoCircleTwoTone style={{ color: '#faad14' }} />,
  info: <InfoCircleTwoTone style={{ color: '#1890ff' }} />,
  normal: undefined,
};

export interface NotificationProps {
  visible: boolean;
  onClose: () => void;
  time?: number;
  title: ReactNode;
  content: ReactNode;
  type?: 'normal' | 'success' | 'error' | 'waring' | 'info';
}

const NotificationComponent: FC<NotificationProps> = (props) => {
  const { visible, onClose, time = 5, title, content, type = 'normal' } = props;
  const [_visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  useEffect(() => {
    let id: number | undefined = undefined;
    if (time) {
      id = window.setTimeout(onClose, time * 1000);
    }
    return () => window.clearTimeout(id);
  }, []);

  return (
    <CSSTransition in={_visible} timeout={350} classNames="alert" unmountOnExit>
      <div className="g-notification">
        {/* @ts-ignore*/}
        {map[type] && <div className="g-notification-type">{map[type]}</div>}
        <div className="g-notification-content">
          <header>
            <span className="title">{title}</span>
            <span className="close-button" onClick={onClose}>
              <CloseCircleOutlined />
            </span>
          </header>
          <main>{content}</main>
        </div>
      </div>
    </CSSTransition>
  );
};

type NotificationType = {
  open: Function;
};

const Notification: NotificationType = {
  open(config: Omit<NotificationProps, 'visible' | 'onClose'>) {
    const { ...rest } = config;
    let wrapper = document.querySelector('.g-notification-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.classList.add('g-notification-wrapper');
      document.body.appendChild(wrapper);
    }
    const close = () => {
      ReactDOM.render(
        <NotificationComponent visible={false} onClose={close} {...rest} />,
        div,
      );
      setTimeout(() => {
        div && ReactDOM.unmountComponentAtNode(div);
        div && div.remove();
      }, 300);
    };
    const div = document.createElement('div');
    wrapper.appendChild(div);
    ReactDOM.render(
      <NotificationComponent visible={true} onClose={close} {...rest} />,
      div,
    );
  },
};

export default Notification;
