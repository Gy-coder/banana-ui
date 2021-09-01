import React, { useEffect, useState } from 'react';
import { CollapseItemProps } from '@/Collapse/types';
import classnames from 'classnames';

const CollapseItem: React.FC<CollapseItemProps> = (props) => {
  const { title, children, selected, change } = props;
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    change(props.name);
  };
  useEffect(() => {
    if (selected.includes(props.name)) setOpen(true);
    else setOpen(false);
  }, [selected]);
  return (
    <div className="g-collapse-item">
      <div className="g-collapse-item-title" onClick={handleClick}>
        {title}
      </div>
      {open && (
        <div className={classnames('g-collapse-item-content', { open })}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapseItem;
