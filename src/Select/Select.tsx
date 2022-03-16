import React, { useState } from 'react';
import classnames from 'classnames';
import { DownOutlined } from '@ant-design/icons';
import './Select.scss';

export interface SelectProps {}

const Select: React.FC<SelectProps> = () => {
  const [showDropDown, setShouDropDown] = useState<boolean>(true);
  const handleClickSelector = () => {
    setShouDropDown(!showDropDown);
  };
  return (
    <div className="g-select">
      <div className="g-select-selector" onClick={handleClickSelector}>
        <span className="g-select-search">
          <input type="search" readOnly />
        </span>
        <span className="g-select-item">title</span>
        <span
          className={classnames('g-select-arrow', {
            isOpen: showDropDown,
            isClose: !showDropDown,
          })}
        >
          <DownOutlined />
        </span>
      </div>
    </div>
  );
};

export default Select;
