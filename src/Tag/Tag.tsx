import React, { CSSProperties, useState } from 'react';
import classnames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import './Tag.scss';
import Transition from '../Transition/Transition';

export interface TagProps {
  closeable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Tag: React.FC<TagProps> = (props) => {
  const { className, children, closeable, onClose } = props;
  const [show, setShow] = useState<boolean>(true);
  const handleClose = () => {
    setShow(false);
    onClose && onClose();
  };
  return (
    <Transition in={show} timeout={300} animation="zoom-in-center">
      <div className={classnames('g-tag', className)}>
        <span>{children}</span>
        {closeable && (
          <CloseOutlined className="g-tag-close-button" onClick={handleClose} />
        )}
      </div>
    </Transition>
  );
};

Tag.defaultProps = {
  closeable: false,
};

export default Tag;
