import React, { useState } from 'react';
// @ts-ignore
import { Input } from 'banana-ui';

const Demo = () => {
  const [n, setN] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setN(e.target.value);
  };
  return (
    <>
      n: {n}
      <br />
      <Input value={n} onChange={onChange} />
    </>
  );
};

export default Demo;
