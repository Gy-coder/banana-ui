import React, { CSSProperties, useState } from 'react';
import classnames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import './Tag.scss';
import Transition from '../Transition/Transition';

export interface TagProps {
  closeable?: boolean;
  onClose?: (e?: React.MouseEvent) => void;
  className?: string;
  color?: string;
  style?: CSSProperties;
}

const Tag: React.FC<TagProps> = (props) => {
  const { className, children, closeable, onClose, color, style } = props;
  const [show, setShow] = useState<boolean>(true);
  const handleClose = (e?: React.MouseEvent) => {
    setShow(false);
    onClose && onClose(e);
  };
  const handleClickClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose(e);
  };
  const classes = classnames('g-tag', className, {
    colored: color,
  });
  return (
    <Transition in={show} timeout={300} animation="zoom-in-center">
      <div
        className={classes}
        style={{
          ...style,
          background: color,
        }}
      >
        <span>{children}</span>
        {closeable && (
          <CloseOutlined
            className="g-tag-close-button"
            onClick={handleClickClose}
          />
        )}
      </div>
    </Transition>
  );
};

Tag.defaultProps = {
  closeable: false,
};

export default Tag;
