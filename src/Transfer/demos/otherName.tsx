import React, { Fragment, Key, useEffect, useState } from 'react';
// @ts-ignore
import { Transfer } from 'banana-ui';

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      value: i,
      desc: `备选项 ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

export default function App() {
  const [modelValue, setModelValue] = useState<Key[]>([1, 3, 5, 7]);
  const handleChange = (newModelValue: Key[]) => {
    console.log('handleChange:', newModelValue);
    setModelValue(newModelValue);
  };
  useEffect(() => {
    console.log('modelValue:', modelValue);
  });
  return (
    <Transfer
      data={generateData()}
      modelValue={modelValue}
      onChangeModelValue={handleChange}
      props={{
        key: 'value',
        label: 'desc',
        disabled: 'disabled',
      }}
    />
  );
}
