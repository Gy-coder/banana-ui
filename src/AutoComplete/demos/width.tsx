import React, { useState } from 'react';
// @ts-ignore
import { AutoComplete, DataSourceType } from 'banana-ui';

const Demo = () => {
  const strArr = [
    'a',
    'ab',
    'aaa',
    'b',
    'bb',
    'bbb',
    'c',
    'cc',
    'ccc',
    'd',
    'dd',
    'ddd',
  ];

  const fetchSuggestion = (query: string) => {
    return strArr
      .filter((item) => item.indexOf(query) >= 0)
      .map((item) => {
        return { value: item };
      });
  };

  const [value, setValue] = useState('');
  const onSelect = (item: DataSourceType) => {
    console.log(item);
  };
  const onChange = (value: string) => {
    setValue(value);
  };
  return (
    <AutoComplete
      value={value}
      onChange={onChange}
      block={false}
      fetchSuggestions={fetchSuggestion}
      onSelect={onSelect}
    />
  );
};

export default Demo;
