import React, { CSSProperties, useEffect, useRef } from 'react';
import classnames from 'classnames';
import './Affix.scss';

export interface AffixProps {
  distance?: number;
  className?: string;
  style?: CSSProperties;
}

const Affix: React.FC<AffixProps> = (props) => {
  const { distance, className, style, children } = props;
  const top = useRef<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const affixRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    changeTop();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const changeTop = () => {
    if (window.scrollY === 0) {
      const value = affixRef.current!.getBoundingClientRect().top;
      top.current = value;
    } else {
      const { scrollX, scrollY } = window;
      window.scrollTo(scrollX, 0);
      top.current = affixRef.current!.getBoundingClientRect().top;
      window.scrollTo(scrollX, scrollY);
    }
  };
  const handleScroll = () => {
    if (window.scrollY > top.current - distance!) {
      const { top, left, right, bottom } =
        wrapperRef.current!.getBoundingClientRect();
      wrapperRef.current!.style.width = right - left + 'px';
      wrapperRef.current!.style.height = bottom - top + 'px';
      wrapperRef.current!.style.left = left + 'px';
      wrapperRef.current!.style.top = distance + 'px';
      wrapperRef.current!.style.position = 'fixed';
    } else {
      wrapperRef.current!.style.position = 'static';
    }
  };
  return (
    <div className="g-affix" ref={affixRef}>
      <div
        className={classnames('g-affix-wrapper', className)}
        ref={wrapperRef}
        style={style}
      >
        {children}
      </div>
    </div>
  );
};

Affix.defaultProps = {
  distance: 0,
};

export default Affix;
