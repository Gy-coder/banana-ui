import React, { useState } from 'react';
// @ts-ignore
import { Switch } from 'banana-ui';

const Demo = () => {
  const [x, setX] = useState(false);
  return (
    <>
      x:{x.toString()}
      <br />
      <Switch value={x} onChange={(value: boolean) => setX(value)} />
    </>
  );
};

export default Demo;
