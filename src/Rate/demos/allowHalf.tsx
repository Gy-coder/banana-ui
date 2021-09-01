import React, { useState } from 'react';
// @ts-ignore
import { Rate } from 'banana-ui';

const Demo = () => {
  const [value, setValue] = useState(0);
  const handleChange = (value: number) => {
    setValue(value);
    alert(`你选中了${value}`);
  };
  return (
    <>
      <Rate value={value} onChange={handleChange} allowHalf />
    </>
  );
};

export default Demo;
