import React, { CSSProperties } from 'react';

export interface OptionProps {
  className?: string;
  style?: CSSProperties;
  value: string;
  onClick?: (value: string) => void;
}

const Option: React.FC<OptionProps> = (props) => {
  const { value, onClick } = props;
  const handleClick = () => {
    onClick && onClick(value);
  };
  return (
    <li className="g-select-dropdown-item" onClick={handleClick}>
      {value}
    </li>
  );
};

export default Option;
