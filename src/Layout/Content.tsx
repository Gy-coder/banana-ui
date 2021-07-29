import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

interface LayoutProps extends HTMLAttributes<HTMLElement> {}

const Content: React.FC<LayoutProps> = (props) => {
  const { children, ...rest } = props;
  const classes = classnames('g-layout-content');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Content;
