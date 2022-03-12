import React from 'react';
// @ts-ignore
import { AutoComplete } from 'banana-ui';

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
    return strArr.filter((item) => item.indexOf(query) >= 0);
  };
  const onSelect = (item: string) => {
    console.log(item);
  };
  return <AutoComplete fetchSuggestion={fetchSuggestion} onSelect={onSelect} />;
};

export default Demo;
