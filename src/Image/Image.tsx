import React, { MouseEvent, useEffect, useState } from 'react';
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
import { CSSTransition } from 'react-transition-group';
import './Image.scss';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

type coordinateType = {
  x: number;
  y: number;
};

const Image: React.FC<ImageProps> = (props) => {
  const { className, src, fallback, ...rest } = props;
  const classnames = classes('banana-image', className);
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [innerSrc, setInnerSrc] = useState<string | undefined>(src);
  const [hover, setHover] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<coordinateType>({
    x: 0,
    y: 0,
  });
  const showLightUp = (e: MouseEvent<HTMLElement>) => {
    !error && setVisible(true);
    setCoordinate({
      x: e.clientX,
      y: e.clientY,
    });
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
      <LightUp
        src={innerSrc}
        visible={visible}
        close={hideLightUp}
        coordinate={coordinate}
      />
    </div>
  );
};

interface LightUpProps {
  src?: string;
  visible: boolean;
  close: () => void;
  coordinate: coordinateType;
}

const LightUp: React.FC<LightUpProps> = (props) => {
  const { src, visible, close, coordinate } = props;
  const [deg, setDeg] = useState<number>(0);
  const [n, setN] = useState<number>(1);
  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [visible]);
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
      <CSSTransition
        in={visible}
        timeout={300}
        classNames="animation"
        unmountOnExit
      >
        <div
          className="banana-image-lightup-wrapper"
          style={{
            transformOrigin: `${coordinate.x}px ${coordinate.y}px`,
          }}
        >
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
      </CSSTransition>
    );
  };
  return ReactDOM.createPortal(render(), document.body);
};

export default Image;
