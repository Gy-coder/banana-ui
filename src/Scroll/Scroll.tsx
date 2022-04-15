import React, {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  UIEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
  TouchEventHandler,
} from 'react';
import './Scroll.scss';
import { ArrowDownOutlined } from '@ant-design/icons';
import scrollbarWidth from './scrollbar-width';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  onPull?: () => void;
}

const Scroll: FC<Props> = (props) => {
  const touchDevice = 'ontouchstart' in document.documentElement;
  const { children, onPull, ...rest } = props;
  const [barHeight, setBarHeight] = useState<number>(0);
  const [barTop, _setBarTop] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<boolean>(false);
  const firstYRef = useRef<number>(0);
  const firstBarTopRef = useRef<number>(0);
  const barVisisble = useMemo(() => !touchDevice, [touchDevice]);
  const setBarTop = (number: number) => {
    if (number < 0) return;
    const scrollHeight: number = containerRef.current!.scrollHeight;
    const viewHeight: number =
      containerRef.current!.getBoundingClientRect().height;
    const scrollTop = containerRef.current!.scrollTop;
    const maxHeight = ((scrollHeight - viewHeight) * viewHeight) / scrollHeight;
    if (number > maxHeight) return;
    _setBarTop(number);
  };
  useEffect(() => {
    const scrollHeight: number = containerRef.current!.scrollHeight;
    const viewHeight: number =
      containerRef.current!.getBoundingClientRect().height;
    setBarHeight((viewHeight * viewHeight) / scrollHeight);
  }, []);
  const handleScroll: UIEventHandler = (e) => {
    const scrollHeight: number = containerRef.current!.scrollHeight;
    const viewHeight: number =
      containerRef.current!.getBoundingClientRect().height;
    const scrollTop = containerRef.current!.scrollTop;
    setBarTop((scrollTop * viewHeight) / scrollHeight);
  };
  const handleMouseUp = (e: MouseEvent) => {
    draggingRef.current = false;
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (draggingRef.current) {
      const delta = e.clientY - firstYRef.current;
      const newBarTop = firstBarTopRef.current + delta;
      setBarTop(newBarTop);
      const scrollHeight: number = containerRef.current!.scrollHeight;
      const viewHeight: number =
        containerRef.current!.getBoundingClientRect().height;
      containerRef.current!.scrollTop = (newBarTop * scrollHeight) / viewHeight;
    }
  };
  const handleMouseDown: MouseEventHandler = (e) => {
    draggingRef.current = true;
    firstYRef.current = e.clientY;
    firstBarTopRef.current = barTop;
  };
  const handleSelectStart = (e: Event) => {
    if (draggingRef.current) e.preventDefault();
  };
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('selectstart', handleSelectStart);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);
  const [translateY, _setTranslateY] = useState(0);
  const lastYRef = useRef(0);
  const moveCount = useRef(0);
  const pulling = useRef(false);
  const setTranslateY = (y: number) => {
    if (y < 0) return;
    else if (y > 100) y = 100;
    _setTranslateY(y);
  };
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    const scrollTop = containerRef.current!.scrollTop;
    if (scrollTop !== 0) return;
    lastYRef.current = e.touches[0].clientY;
    pulling.current = true;
    moveCount.current = 0;
  };
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    moveCount.current += 1;
    const delta = e.touches[0].clientY - lastYRef.current;
    if (moveCount.current === 1 && delta < 0) {
      // not pull onMouseDown
      pulling.current = false;
      return;
    }
    if (pulling.current === false) return;
    if (delta > 0) {
      setTranslateY(translateY + delta);
    } else {
      setTranslateY(translateY + delta);
    }
    lastYRef.current = e.touches[0].clientY;
  };
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (pulling.current === true) {
      onPull?.();
      setTranslateY(0);
      pulling.current = false;
    }
  };
  return (
    <div className="g-scroll" {...rest}>
      <div
        className="g-scroll-inner"
        style={{
          right: -scrollbarWidth(),
          transform: `translateY(${translateY}px)`,
        }}
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
      {barVisisble && (
        <div className="g-scroll-track">
          <div
            className="g-scroll-bar"
            style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
      )}
      <div className="g-scroll-pulling" style={{ height: translateY }}>
        {translateY === 100 ? (
          <span className="g-scroll-text">释放手指即可更新</span>
        ) : (
          <span className="g-scroll-icon">
            <ArrowDownOutlined />
          </span>
        )}
      </div>
    </div>
  );
};

export default Scroll;
