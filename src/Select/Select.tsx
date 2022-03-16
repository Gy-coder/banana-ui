import React, {
  CSSProperties,
  FunctionComponentElement,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { DownOutlined } from '@ant-design/icons';
import Transition from '../Transition/Transition';
import Option, { OptionProps } from '../Select/Option';
import { useClickOutside } from '../hooks/useClickOutside';
import './Select.scss';

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

const Select: React.FC<SelectProps> = (props) => {
  const { children, value, onChange, className, style } = props;
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const handleClickSelector = () => {
    setShowDropDown(!showDropDown);
  };
  const handleClick = (newValue: string) => {
    onChange && onChange(newValue);
    setShowDropDown(false);
  };
  useClickOutside(componentRef, () => {
    setShowDropDown(false);
  });
  const generateDropDown = () => {
    return (
      <Transition in={showDropDown} timeout={300} animation="zoom-in-top">
        <ul className="g-select-dropdown">
          {React.Children.map(children, (child) => {
            const childElement = child as FunctionComponentElement<OptionProps>;
            if (childElement.type !== Option) {
              throw new Error('Select的子元素必须是Option');
            }
            return React.cloneElement(childElement, { onClick: handleClick });
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div
      className={classnames('g-select', className)}
      ref={componentRef}
      style={style}
    >
      <div className="g-select-selector" onClick={handleClickSelector}>
        <span className="g-select-search">
          <input type="search" readOnly />
        </span>
        <span className="g-select-item">{value}</span>
        <span
          className={classnames('g-select-arrow', {
            isOpen: showDropDown,
            isClose: !showDropDown,
          })}
        >
          <DownOutlined />
        </span>
      </div>
      {generateDropDown()}
    </div>
  );
};

export default Select;
