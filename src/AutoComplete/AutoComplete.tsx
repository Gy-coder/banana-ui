import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';
import Input, { InputProps } from '../Input/Input';
import Transition from '../Transition/Transition';
import { useDebounce } from '../hooks/useDebounce';
import { useClickOutside } from '../hooks/useClickOutside';
import './AutoComplete.scss';

export interface AutoCompleteProps
  extends Omit<InputProps, 'onSelect' | 'onChange'> {
  fetchSuggestions: (
    str: string,
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  onChange?: (str: string) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
  block?: boolean;
}

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    onChange,
    block,
    renderOption,
    ...restProps
  } = props;
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const triggerSearch = useRef<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce(value, 200);
  const showDropDown = useMemo(() => {
    if (suggestions.length > 0) return true;
    return false;
  }, [suggestions.length]);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const res = fetchSuggestions(debounceValue as string);
      if (res instanceof Promise) {
        setLoading(true);
        res.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
          }
        });
      } else {
        setSuggestions(res);
        if (res.length > 0) {
        }
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debounceValue]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    onChange && onChange(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    onChange && onChange(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
    triggerSearch.current = false;
  };
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropDown = () => {
    return (
      <Transition
        in={showDropDown || loading}
        animation="zoom-in-top"
        timeout={300}
      >
        <ul className="g-auto-complete-suggestion">
          {loading && <LoadingOutlined className="g-suggesstion-icon" />}
          {suggestions.map((item, index) => {
            const classes = classnames('g-auto-complete-suggestion-item', {
              'item-highlighted': index === highlightIndex,
            });
            return (
              <li
                className={classes}
                key={index + Math.random()}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div
      className={classnames('g-auto-complete', {
        block,
      })}
      ref={componentRef}
    >
      <Input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        block
        {...restProps}
      />
      {loading && (
        <ul className="g-auto-complete-suggestion">
          <LoadingOutlined className="g-suggesstion-icon" />
        </ul>
      )}
      {generateDropDown()}
    </div>
  );
};

AutoComplete.defaultProps = {
  block: true,
};

export default AutoComplete;
