import React, { useContext, useMemo } from 'react';
import classnames from 'classnames';
import { SelectedContext } from '../Select/SelectedContext';

export interface OptionProps {
  value: string;
  onClick?: (value: string) => void;
  onHover?: (index: number) => void;
  index: number;
}

const Option: React.FC<OptionProps> = (props) => {
  const { value, onClick, onHover, index } = props;
  const { selectedValue, hightlightIndex } = useContext(SelectedContext);
  const handleClick = () => {
    onClick && onClick(value);
  };
  const handleMouseEnter = () => {
    onHover && onHover(index);
  };
  const isSelected = useMemo(() => {
    return selectedValue === value;
  }, [selectedValue]);
  const isHover = useMemo(() => {
    return hightlightIndex === index;
  }, [hightlightIndex]);
  return (
    <li
      className={classnames('g-select-dropdown-item', {
        isSelected,
        isHover,
      })}
      onClick={handleClick}
      onMouseMove={handleMouseEnter}
    >
      {value}
    </li>
  );
};

export default Option;
