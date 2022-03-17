import React, {
  CSSProperties,
  FC,
  FunctionComponentElement,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { DownOutlined } from '@ant-design/icons';
import Transition from '../Transition/Transition';
import Option, { OptionProps } from '../Select/Option';
import { useClickOutside } from '../hooks/useClickOutside';
import { SelectContextProps, SelectedContext } from './SelectedContext';
import './Select.scss';

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

const SelectComponent: React.FC<SelectProps> = (props) => {
  const { children, value, onChange, className, style } = props;
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [highlightIndex, setHightIndex] = useState<number>(-1);
  const componentRef = useRef<HTMLDivElement>(null);
  const selectContext: SelectContextProps = {
    selectedValue: value,
    hightlightIndex: highlightIndex,
  };
  const handleClickSelector = () => {
    setShowDropDown(!showDropDown);
  };
  const handleClick = (newValue: string) => {
    onChange && onChange(newValue);
    setShowDropDown(false);
  };
  const handleMouseEnter = (index: number) => {
    setHightIndex(index);
  };
  useClickOutside(componentRef, () => {
    setShowDropDown(false);
  });
  const generateDropDown = () => {
    return (
      <Transition in={showDropDown} timeout={300} animation="zoom-in-top">
        <SelectedContext.Provider value={selectContext}>
          <ul className="g-select-dropdown">
            {React.Children.map(children, (child, index) => {
              const childElement =
                child as FunctionComponentElement<OptionProps>;
              if (childElement.type !== Option) {
                throw new Error('Select的子元素必须是Option');
              }
              return React.cloneElement(childElement, {
                onClick: handleClick,
                onHover: handleMouseEnter,
                index,
              });
            })}
          </ul>
        </SelectedContext.Provider>
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

export type SelectType = FC<SelectProps> & {
  Option: FC<OptionProps>;
};

const Select = SelectComponent as SelectType;
Select.Option = Option;

export default Select;
