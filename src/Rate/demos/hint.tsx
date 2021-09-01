import React, { useState } from 'react';
// @ts-ignore
import { Rate } from 'banana-ui';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Demo = () => {
  const [value, setValue] = useState(3);
  const handleChange = (value: number) => {
    setValue(value);
    alert(`你选中了${value}`);
  };
  return (
    <>
      <Rate value={value} onChange={handleChange} hint={desc} />
    </>
  );
};

export default Demo;
