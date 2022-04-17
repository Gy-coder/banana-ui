import React, { useState } from 'react';
// @ts-ignore
import { Slider } from 'banana-ui';
import { useEffect } from 'react';

export default function Demo() {
  const [value, setValue] = useState(190);
  const handleChange = (value: number) => {
    setValue(value);
  };
  useEffect(() => {
    console.log('你选中的value是:', value);
  }, [value]);
  return (
    <>
      <Slider value={value} onChange={handleChange} min={100} max={250} />
    </>
  );
}
