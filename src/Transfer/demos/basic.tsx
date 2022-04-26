import React, { useState, useEffect } from 'react';
//@ts-ignore
import { Transfer } from 'banana-ui';

const generateData = (_?: any) => {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

export default function basic() {
  const [modelValue, setModelValue] = useState([1, 3, 5, 7]);
  const handleChange = (newModelValue: Array<number>) => {
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
    />
  );
}
