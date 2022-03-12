import React from 'react';
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
  const onSelect = (item: DataSourceType) => {
    console.log(item);
  };
  return (
    <AutoComplete fetchSuggestions={fetchSuggestion} onSelect={onSelect} />
  );
};

export default Demo;
