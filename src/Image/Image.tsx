import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  CloseCircleOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
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
  const [hover, setHover] = useState<boolean>(false);
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
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <div className={classnames}>
      <img src={innerSrc} onError={hanleError} {...rest} />
      {!error && (
        <div
          className="banana-image-info-mask"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={showLightUp}
          style={{
            opacity: hover ? 1 : 0,
          }}
        >
          <EyeOutlined className="eye" />
          preview
        </div>
      )}
      <LightUp src={innerSrc} visible={visible} close={hideLightUp} />
    </div>
  );
};

interface LightUpProps {
  src?: string;
  visible: boolean;
  close: () => void;
}

const LightUp: React.FC<LightUpProps> = (props) => {
  const { src, visible, close } = props;
  const [deg, setDeg] = useState<number>(0);
  const [n, setN] = useState<number>(1);
  const handleTurnLeft = () => {
    setDeg(deg - 90);
  };
  const handleTurnRight = () => {
    setDeg(deg + 90);
  };
  const handleClose = () => {
    close();
    setDeg(0);
    setN(1);
  };
  const PlusN = () => {
    if (n > 8) return;
    setN(n * 2);
  };
  const MinusN = () => {
    if (n <= 0.125) return;
    setN(n / 2);
  };
  const render = () => {
    return (
      visible && (
        <div className="banana-image-lightup-wrapper">
          <div className="banana-image-lightup-mask" onClick={handleClose} />
          <ul className="banana-image-option-wrapper">
            <li className="banana-image-option-item" onClick={handleClose}>
              <CloseCircleOutlined />
            </li>
            <li className="banana-image-option-item" onClick={handleTurnRight}>
              <RotateRightOutlined />
            </li>
            <li className="banana-image-option-item" onClick={handleTurnLeft}>
              <RotateLeftOutlined />
            </li>
            <li className="banana-image-option-item" onClick={PlusN}>
              <PlusCircleOutlined />
            </li>
            <li className="banana-image-option-item" onClick={MinusN}>
              <MinusCircleOutlined />
            </li>
          </ul>
          <div className="banana-image-lightup-content-wrapper">
            <img
              className="banana-image-lightup-content"
              src={src}
              style={{
                transform: `scale3d(${n}, ${n}, 1) rotate(${deg}deg)`,
              }}
            />
          </div>
        </div>
      )
    );
  };
  return ReactDOM.createPortal(render(), document.body);
};

export default Image;
