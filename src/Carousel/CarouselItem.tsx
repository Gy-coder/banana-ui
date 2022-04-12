import React, { CSSProperties, FC, Fragment, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

export interface ItemProps {
  curIndex?: number;
  index?: number;
  reverse?: boolean;
  style?: CSSProperties;
  animationName?: string;
}

const carouselItem: FC<ItemProps> = (props) => {
  const { children, index, curIndex, reverse, animationName = 'slide' } = props;
  const active = useMemo(() => curIndex === index, [curIndex]);
  return (
    <Fragment>
      <CSSTransition
        in={active}
        classNames="carousel"
        timeout={3000}
        key={index}
        // unmountOnExit
      >
        <div
          className={classnames('g-carousel-item', animationName, {
            active,
            reverse,
          })}
        >
          {children}
        </div>
      </CSSTransition>
    </Fragment>
  );
};

export default carouselItem;
