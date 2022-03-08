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
        src={src}
        visible={visible}
        setVisible={(visible) => setVisible(!visible)}
      />
    </div>
  );
};

interface LightUpProps {
  src?: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const LightUp: React.FC<LightUpProps> = (props) => {
  const { src, visible, setVisible } = props;
  const render = () => {
    return (
      visible && (
        <div className="banana-image-lightup-wrapper">
          <div className="banana-image-lightup-mask" />
          <div className="banana-image-lightup-content-wrapper">
            <img className="banana-image-lightup-content" src={src} />
          </div>
        </div>
      )
    );
  };
  return ReactDOM.createPortal(render(), document.body);
};

export default Image;
