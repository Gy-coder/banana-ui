import React, { useMemo } from 'react';
import { CollapseItemProps } from './types';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';

const CollapseItem: React.FC<CollapseItemProps> = (props) => {
  const { title, children, selected, change } = props;
  const handleClick = () => {
    change(props.name);
  };
  const open = useMemo(() => selected.indexOf(props.name) >= 0, [selected]);

  const onEntering = (node: HTMLElement) => {
    let { height } = node.getBoundingClientRect();
    node.style.height = 0 + 'px';
    node.getBoundingClientRect();
    node.style.height = `${height}px`;
  };
  const onEntered = (node: HTMLElement) => {
    node.style.height = 'auto';
  };
  const onExiting = (node: HTMLElement) => {
    const { height } = node.getBoundingClientRect();
    node.style.height = height + 'px';
    node.getBoundingClientRect();
    node.style.height = '0px';
  };
  const onExited = (node: HTMLElement) => {
    node.style.height = 'auto';
    node.classList.add('gone');
  };
  const addEndListener = (node: HTMLElement, done: any) => {
    // use the css transitionend event to mark the finish of a transition
    node.addEventListener('transitionend', done, false);
  };
  return (
    <div className="g-collapse-item">
      <div className="g-collapse-item-title" onClick={handleClick}>
        {title}
      </div>
      <Transition
        in={open}
        timeout={250}
        unmountOnExit
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
        addEndListener={addEndListener}
      >
        <div
          className={classnames('g-collapse-item-content', { close: !open })}
        >
          {children}
        </div>
      </Transition>
    </div>
  );
};

export default CollapseItem;
