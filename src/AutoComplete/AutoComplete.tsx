import React, { useState } from 'react';
import Input, { InputProps } from '../Input/Input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (str: string) => string[];
  onSelect?: (item: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestion, onSelect, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const res = fetchSuggestion(value);
      setSuggestions(res);
      console.log(res);
    } else {
      setSuggestions([]);
    }
  };
  const handleSelect = (e: React.MouseEvent<HTMLLIElement>, item: string) => {
    setInputValue(item);
    setSuggestions([]);
    onSelect && onSelect(item);
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
              {item}
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
