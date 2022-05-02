import React, {
  CSSProperties,
  FC,
  ReactNode,
  TouchEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CarouselItem, { ItemProps } from './CarouselItem';
import classnames from 'classnames';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Carousel.scss';

export interface Props {
  time?: number;
  autoPlay?: boolean;
  className?: string;
  style?: CSSProperties;
}
interface Params {
  curIndex: number;
  direction: 'forward' | 'reverse';
}

const Component: FC<Props> = (props) => {
  const { children, time = 3, autoPlay, className, style } = props;
  const [params, setParams] = useState<Params>({
    curIndex: 0,
    direction: 'forward',
  });
  const timerId = useRef<any>(null);
  const length = useMemo(() => {
    return Array.from(children as ReactNode[]).length || 1;
  }, [children]);
  const [showButton, setShowButton] = useState(false);
  const classes = classnames('g-carousel', className);
  const startTouch = useRef<any>();
  const endTouch = useRef<any>();
  const onNext = () => {
    setParams(() => {
      params.curIndex = (params.curIndex + 1 + length) % length;
      params.direction = 'forward';
      return { ...params };
    });
  };
  const onPrev = () => {
    setParams(() => {
      params.curIndex = (params.curIndex - 1 + length) % length;
      params.direction = 'reverse';
      return { ...params };
    });
  };
  const playAutomatically = () => {
    if (!autoPlay) return;
    timerId.current = window.setInterval(onNext, time * 1000);
  };
  const parse = () => {
    window.clearInterval(timerId.current);
  };
  const handleMouseEnter = () => {
    parse();
    setShowButton(true);
  };
  const handleMouseLeave = () => {
    playAutomatically();
    setShowButton(false);
  };
  const handleClickDot = (idx: number) => {
    setParams(() => {
      params.direction = params.curIndex > idx ? 'reverse' : 'forward';
      params.curIndex = idx;
      return { ...params };
    });
  };
  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    parse();
    if (e.touches.length > 1) return;
    startTouch.current = e.touches[0];
  };
  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    endTouch.current = e.changedTouches[0];
    const { clientX: x1, clientY: y1 } = startTouch.current;
    const { clientX: x2, clientY: y2 } = endTouch.current;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const deltaY = Math.abs(y2 - y1);
    const rate = distance / deltaY;
    if (rate > 2) {
      if (x2 > x1) {
        onNext();
      } else {
        onPrev();
      }
    }
    if (props.autoPlay) playAutomatically();
  };
  useEffect(() => {
    playAutomatically();
    return () => clearInterval(timerId.current);
  }, []);
  return (
    <div
      className={classes}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="g-carousel-window">
        <div className="g-carousel-wrapper">
          {React.Children.map(children, (child, index) => {
            const ChildElement =
              child as React.FunctionComponentElement<ItemProps>;
            //@ts-ignore
            if (child.type !== CarouselItem) throw new Error('必须是Item');
            return React.cloneElement(ChildElement, {
              index,
              curIndex: params.curIndex,
              reverse: params.direction === 'reverse',
            });
          })}
        </div>
        <div className="g-carousel-dots">
          {Array.from({ length }).map((item, index) => {
            return (
              <span
                className={classnames('g-carousel-dot', {
                  active: params.curIndex === index,
                })}
                onClick={() => handleClickDot(index)}
                key={item as number}
              >
                <button />
              </span>
            );
          })}
        </div>
        <div
          className="g-carousel-button g-carousel-button-left"
          style={{ display: !showButton ? 'none' : 'flex' }}
          onClick={onPrev}
        >
          <span>
            <LeftOutlined />
          </span>
        </div>
        <div
          className="g-carousel-button g-carousel-button-right"
          style={{ display: !showButton ? 'none' : 'flex' }}
          onClick={onNext}
        >
          <span>
            <RightOutlined />
          </span>
        </div>
      </div>
    </div>
  );
};

type CarouselType = {
  Item: FC<ItemProps>;
} & FC<Props>;

const Carousel: CarouselType = Component as CarouselType;

Carousel.Item = CarouselItem;

Carousel.defaultProps = {
  time: 3,
  autoPlay: true,
};

export default Carousel;
