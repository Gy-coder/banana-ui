import React, { useState } from 'react';
// @ts-ignore
import { Rate } from 'banana-ui';

const Demo = () => {
  const [value,setValue] = useState(1)
  const handleChange = (value: number)=>{
    setValue(value)
    alert(`你选中了${value}`)
  }
  return (
    <>
      <Rate
        value={value}
        onChange={handleChange}
        readonly
      />
    </>
  );
};

export default Demo;
