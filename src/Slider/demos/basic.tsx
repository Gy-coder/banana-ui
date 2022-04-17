import React, { useState } from 'react';
// @ts-ignore
import { Slider } from 'banana-ui';

export default function Demo() {
  const [value, setValue] = useState(190);
  const handleChange = (value: number) => {
    setValue(value);
  };
  return (
    <>
      <Slider value={value} onChange={handleChange} min={100} max={250} />
    </>
  );
}
