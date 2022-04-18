import React, { useState } from 'react';
// @ts-ignore
import { Slider } from 'banana-ui';
import { useEffect } from 'react';

export default function Demo() {
  const [value, setValue] = useState(50);
  const handleChange = (value: number) => {
    setValue(value);
  };
  useEffect(() => {
    console.log('你选中的value是:', value);
  }, [value]);
  return (
    <>
      你选中的值是:{value}
      <Slider value={value} onChange={handleChange} />
    </>
  );
}
