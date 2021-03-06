import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { CloseCircleOutlined } from '@ant-design/icons';
import './Drawer.scss';

export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  closeable?: boolean;
  container?: HTMLElement | false;
  placement?: 'top' | 'left' | 'bottom' | 'right';
  width?: number;
  height?: number;
  zIndex?: number;
  showMask?: boolean;
  maskClosable?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  headerStyle?: CSSProperties;
  mainStyle?: CSSProperties;
  footerStyle?: CSSProperties;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const cn = 'g-drawer';
  const {
    visible,
    onClose,
    closeable,
    placement,
    container,
    width,
    height,
    zIndex,
    showMask,
    maskClosable,
    title,
    footer,
    headerStyle,
    mainStyle,
    footerStyle,
    children,
  } = props;
  const componentRef = useRef<HTMLDivElement>(null);
  const placementRef = useRef<DrawerProps['placement']>(placement);
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (visible && showMask) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [visible]);

  useEffect(() => {
    placementRef.current = placement;
  }, [placement]);
  const html = () => {
    return (
      <div
        className={classnames(cn, cn + `-${placement}`, {
          'g-drawer-open': visible,
          'g-drawer-close': !visible,
          'g-drawer-remove-transition': placementRef.current !== placement,
        })}
        ref={componentRef}
        style={{
          zIndex,
        }}
      >
        {!!showMask && (
          <div
            className={cn + '-mask'}
            onClick={maskClosable ? handleClose : undefined}
          />
        )}
        <div
          className={classnames(cn + '-content')}
          style={{
            zIndex,
            width:
              placement === 'left' || placement === 'right' ? width : '100%',
            height:
              placement === 'top' || placement === 'bottom' ? height : '100%',
          }}
        >
          <div className={cn + '-header'} style={headerStyle}>
            {title}
            {closeable && (
              <CloseCircleOutlined
                className="close-button"
                onClick={handleClose}
              />
            )}
          </div>
          <div className={cn + '-main'} style={mainStyle}>
            {children}
          </div>
          {footer && (
            <div className={cn + '-footer'} style-={footerStyle}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  };

  return container === false
    ? html()
    : ReactDOM.createPortal(html(), document.body);
};

Drawer.defaultProps = {
  closeable: true,
  placement: 'right',
  width: 384,
  height: 384,
  zIndex: 1000,
  showMask: true,
  maskClosable: true,
  container: document.body,
};

export default Drawer;
