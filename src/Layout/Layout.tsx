import React, { HTMLAttributes, ReactElement } from 'react';
import classnames from 'classnames';
import './Layout.scss';
import Sider from './Sider';

interface LayoutProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement | Array<ReactElement>;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, ...rest } = props;
  const sider = (children as Array<ReactElement>).reduce((prev, node) => {
    return prev || node.type === Sider;
  }, false);
  const classes = classnames('g-layout', {
    'g-layout-has-sider': sider,
  });
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

Layout.displayName = 'Layout';

export default Layout;
