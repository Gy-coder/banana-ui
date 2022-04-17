import React, { useState } from 'react';
// @ts-ignore
import { Slider } from 'banana-ui';
import { useEffect } from 'react';

const marks = {
  100: '100°C',
  140: '140°C',
  170: '170°C',
  250: <strong style={{ color: 'red' }}>250°C</strong>,
};

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
      你选中的值是:{value}
      <Slider
        value={value}
        onChange={handleChange}
        min={100}
        max={800}
        marks={marks}
      />
    </>
  );
}
