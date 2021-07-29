import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

interface LayoutProps extends HTMLAttributes<HTMLElement> {}

const Sider: React.FC<LayoutProps> = (props) => {
  const { children, ...rest } = props;
  const classes = classnames('g-layout-sider');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Sider;
