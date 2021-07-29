import React, { ReactNode } from 'react';

interface TabsItemProps {
  /**
   * @description 选项标题
   */
  title: ReactNode;
}

const TabsItem: React.FC<TabsItemProps> = (props) => {
  const { children, title, ...rest } = props;
  return (
    <div className="g-tabs-item" {...rest}>
      {children}
    </div>
  );
};

export default TabsItem;
