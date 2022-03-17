import React, { useContext, useMemo } from 'react';
import classnames from 'classnames';
import { SelectedContext } from '../Select/SelectedContext';

export interface OptionProps {
  value: string;
  onClick?: (value: string) => void;
}

const Option: React.FC<OptionProps> = (props) => {
  const { value, onClick } = props;
  const { selectedValue } = useContext(SelectedContext);
  const handleClick = () => {
    onClick && onClick(value);
  };
  const isSelected = useMemo(() => {
    return selectedValue === value;
  }, [selectedValue]);
  return (
    <li
      className={classnames('g-select-dropdown-item', {
        isSelected,
      })}
      onClick={handleClick}
    >
      {value}
    </li>
  );
};

export default Option;
