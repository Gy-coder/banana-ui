import React, { useState } from 'react';
// @ts-ignore
import { AutoComplete, DataSourceType } from 'banana-ui';

interface LakerPlayerProps {
  number: number;
}

const Demo = () => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];
  const handleFetch = (query: string): LakerPlayerProps[] => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    );
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
      fetchSuggestions={handleFetch}
      onSelect={onSelect}
      renderOption={renderOption}
    />
  );
};

export default Demo;
