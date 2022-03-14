import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import './Transition.scss';

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
  classNames?: string;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, classNames, wrapper, children, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames || animation} {...restProps}>
      {wrapper ? <div>children</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
  wrapper: false,
};

export default Transition;
