import React, { ReactNode } from 'react';
import './Drawer.scss';

export interface DrawerProps {
  visible: boolean;
  onChange: (visible: boolean) => void;
  closeable?: boolean;
  container?: HTMLElement | false;
  placement?: 'top' | 'left' | 'bottom' | 'right';
  width?: number;
  zIndex?: number;
  showMask?: boolean;
  maskClosable?: boolean;
  title?: ReactNode;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const {
    visible,
    onChange,
    closeable,
    placement,
    container,
    width,
    zIndex,
    showMask,
    maskClosable,
    title,
    children,
  } = props;

  return <div>Drawer</div>;
};

Drawer.defaultProps = {
  closeable: true,
  placement: 'right',
  width: 384,
  zIndex: 1000,
  showMask: true,
  maskClosable: true,
  container: document.body,
};

export default Drawer;
