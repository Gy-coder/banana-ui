import React, {
  CSSProperties,
  FC,
  FunctionComponentElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { DownOutlined } from '@ant-design/icons';
import Transition from '../Transition/Transition';
import Option, { OptionProps } from '../Select/Option';
import Tag from '../Tag/Tag';
import { useClickOutside } from '../hooks/useClickOutside';
import { SelectContextProps, SelectedContext } from './SelectedContext';
import './Select.scss';

export interface SelectProps {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  value: string | string[];
  onChange: (newValue: string | string[]) => void;
  multiple?: boolean;
}

const SelectComponent: React.FC<SelectProps> = (props) => {
  const { children, value, onChange, className, style, disabled, multiple } =
    props;
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const length = (children as Array<ReactNode>).length;
  const componentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectContext: SelectContextProps = {
    selectedValue: value,
    hightlightIndex: highlightIndex,
    multiple: multiple || false,
  };
  const handleClickSelector = () => {
    if (disabled) return;
    setShowDropDown(!showDropDown);
  };
  const handleSelect = (newValue: string) => {
    if (multiple) {
      const copyValue: string[] = JSON.parse(JSON.stringify(value));
      const idx = copyValue.indexOf(newValue);
      if (idx >= 0) {
        copyValue.splice(idx, 1);
      } else {
        copyValue.push(newValue);
      }
      onChange && onChange(copyValue);
    } else {
      onChange && onChange(newValue);
      setShowDropDown(false);
    }
  };

  const handleMouseMove = (index: number) => {
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const childrenArray = children as Array<ReactElement>;
    e.preventDefault();
    switch (e.key) {
      case 'Escape':
        setShowDropDown(false);
        break;
      case 'ArrowDown':
        let idxDown = (highlightIndex + 1) % length;
        while (childrenArray[idxDown].props.disabled) {
          idxDown = (idxDown + 1) % length;
        }
        setHighlightIndex(idxDown);
        break;
      case 'ArrowUp':
        let idxUp = (highlightIndex - 1 + length) % length;
        while (childrenArray[idxUp].props.disabled) {
          idxUp = (idxUp - 1 + length) % length;
        }
        setHighlightIndex(idxUp);
        break;
      case 'Enter':
        if (!showDropDown) {
          setShowDropDown(true);
          return;
        }
        if (highlightIndex === -1) {
          setShowDropDown(false);
          return;
        }
        const val = childrenArray[highlightIndex].props.value;
        handleSelect(val);
        break;
    }
  };
  const handleClickTag = (deleteValue: string) => {
    const valueCopy: string[] = JSON.parse(JSON.stringify(value));
    const idx = valueCopy.indexOf(deleteValue);
    if (idx !== -1) valueCopy.splice(idx, 1);
    onChange && onChange(valueCopy);
  };
  useClickOutside(componentRef, () => {
    setShowDropDown(false);
  });
  useEffect(() => {
    if (showDropDown) {
      inputRef.current!.focus();
    }
  });
  const generateDropDown = () => {
    return (
      <Transition in={showDropDown} timeout={300} animation="zoom-in-top">
        <SelectedContext.Provider value={selectContext}>
          <ul className="g-select-dropdown" ref={dropdownRef}>
            {React.Children.map(children, (child, index) => {
              const childElement =
                child as FunctionComponentElement<OptionProps>;
              if (childElement.type !== Option) {
                throw new Error('Select的子元素必须是Option');
              }
              return React.cloneElement(childElement, {
                key: index + Math.random(),
                onClick: handleSelect,
                onHover: handleMouseMove,
                index,
              });
            })}
          </ul>
        </SelectedContext.Provider>
      </Transition>
    );
  };

  return (
    <>
      <div
        style={{ position: 'fixed', top: 10, left: 10, width: 20, height: 20 }}
      >
        show: {showDropDown.toString()}
      </div>
      <div
        className={classnames('g-select', className, {
          disabled,
        })}
        ref={componentRef}
        style={style}
      >
        <div
          className={classnames('g-select-selector', {
            multiple,
          })}
          onClick={handleClickSelector}
        >
          {multiple ? (
            <>
              <div className="g-select-mutiple">
                {(value as string[]).map((v) => {
                  return (
                    <Tag key={v} closeable onClose={() => handleClickTag(v)}>
                      {v}
                    </Tag>
                  );
                })}
                <div className="g-select-search">
                  <input
                    ref={inputRef}
                    type="search"
                    readOnly
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <span className="g-select-item">{value}</span>
              <span className="g-select-search">
                <input
                  ref={inputRef}
                  type="search"
                  readOnly
                  onKeyDown={handleKeyDown}
                />
              </span>
            </>
          )}
        </div>
        <span
          className={classnames('g-select-arrow', {
            isOpen: showDropDown,
            isClose: !showDropDown,
          })}
        >
          <DownOutlined />
        </span>
        {generateDropDown()}
      </div>
    </>
  );
};

export type SelectType = FC<SelectProps> & {
  Option: FC<OptionProps>;
};

const Select = SelectComponent as SelectType;
Select.Option = Option;

Select.defaultProps = {
  disabled: false,
  multiple: false,
};

export default Select;
