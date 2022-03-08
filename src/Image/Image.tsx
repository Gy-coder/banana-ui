import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from 'classnames';
import './Image.scss';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<ImageProps> = (props) => {
  const { className, src, ...rest } = props;
  const classnames = classes('banana-image', className);
  const [visible, setVisible] = useState<boolean>(false);
  const showLightUp = () => {
    setVisible(true);
  };
  const hideLightUp = () => {
    setVisible(false);
  };
  return (
    <div className={classnames}>
      <img src={src} onClick={showLightUp} {...rest} />
      <LightUp src={src} visible={visible} close={hideLightUp} />
    </div>
  );
};

interface LightUpProps {
  src?: string;
  visible: boolean;
  close: (visible: boolean) => void;
}

const LightUp: React.FC<LightUpProps> = (props) => {
  const { src, visible, close } = props;
  const handleClose = () => {
    close();
  };
  const render = () => {
    return (
      visible && (
        <div className="banana-image-lightup-wrapper">
          <div className="banana-image-lightup-mask" onClick={handleClose} />
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
