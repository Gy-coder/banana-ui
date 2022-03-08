import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from 'classnames';
import './Image.scss';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const { className, src, fallback, ...rest } = props;
  const classnames = classes('banana-image', className);
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [innerSrc, setInnerSrc] = useState<string | undefined>(src);
  const showLightUp = () => {
    !error && setVisible(true);
  };
  const hideLightUp = () => {
    setVisible(false);
  };
  const hanleError = () => {
    setError(true);
    fallback && setInnerSrc(fallback);
  };
  return (
    <div className={classnames}>
      <img
        src={innerSrc}
        onClick={showLightUp}
        onError={hanleError}
        {...rest}
      />
      <LightUp src={innerSrc} visible={visible} close={hideLightUp} />
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
