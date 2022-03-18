import React, { useContext, useMemo } from 'react';
import classnames from 'classnames';
import { SelectedContext } from '../Select/SelectedContext';

export interface OptionProps {
  value: string;
  onClick?: (value: string) => void;
  onHover?: (index: number) => void;
  index: number;
  disabled?: boolean;
}

const Option: React.FC<OptionProps> = (props) => {
  const { value, onClick, onHover, index, disabled } = props;
  const { selectedValue, hightlightIndex, multiple } =
    useContext(SelectedContext);
  const handleClick = () => {
    if (disabled) return;
    onClick && onClick(value);
  };
  const handleMouseEnter = () => {
    if (disabled) return;
    onHover && onHover(index);
  };
  const isSelected = useMemo(() => {
    if (multiple) return selectedValue.includes(value);
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
        disabled,
      })}
      onClick={handleClick}
      onMouseMove={handleMouseEnter}
    >
      {value}
    </li>
  );
};

Option.defaultProps = {
  disabled: false,
};

export default Option;
