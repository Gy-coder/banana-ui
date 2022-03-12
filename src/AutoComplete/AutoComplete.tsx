import React, { ReactElement, useState } from 'react';
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const res = fetchSuggestions(value);
      if (res instanceof Promise) {
        res.then((data) => {
          setSuggestions(data);
        });
      } else {
        setSuggestions(res);
      }
    } else {
      setSuggestions([]);
    }
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
      {suggestions.length > 0 && generateDropDown()}
    </div>
  );
};

export default AutoComplete;
