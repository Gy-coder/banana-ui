import React, { useState, useEffect } from 'react';
// @ts-ignore
import { ColorPicker } from 'banana-ui';
export default function Demo() {
  const [color, setColor] = useState('');
  const handleChange = (val: string) => {
    setColor(val);
  };
  useEffect(() => {
    console.log(color);
  }, [color]);
  return <ColorPicker value={color} onChange={handleChange} />;
}
