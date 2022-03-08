import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from 'classnames';
import './Image.scss';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<ImageProps> = (props) => {
  const { className, src, ...rest } = props;
  const classnames = classes('banana-image', className);
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <div className={classnames}>
      <img src={src} {...rest} />
      <LightUp
        visible={visible}
        setVisible={(visible) => setVisible(!visible)}
      />
    </div>
  );
};

interface LightUpProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const LightUp: React.FC<LightUpProps> = (props) => {
  const { visible, setVisible } = props;
  const render = () => {
    return visible && <div>LightUp</div>;
  };
  return ReactDOM.createPortal(render(), document.body);
};

export default Image;
