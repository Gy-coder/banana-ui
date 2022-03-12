import React, { ReactElement, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useDebounce } from '../hooks/useDebounce';
import Input, { InputProps } from '../Input/Input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string,
  ) => DataSourceType[] | Promise<DataSourceObject[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption: (item: DataSourceType) => ReactElement;
}

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
    props;
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debounceValue = useDebounce(inputValue, 500);
  useEffect(() => {
    if (debounceValue) {
      const res = fetchSuggestions(debounceValue as string);
      if (res instanceof Promise) {
        setLoading(true);
        res.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(res);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };
  const handleSelect = (
    e: React.MouseEvent<HTMLLIElement>,
    item: DataSourceType,
  ) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li
              key={index + Math.random()}
              onClick={(e) => handleSelect(e, item)}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="g-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {loading && (
        <ul>
          <LoadingOutlined />
        </ul>
      )}
      {suggestions.length > 0 && generateDropDown()}
    </div>
  );
};

export default AutoComplete;
