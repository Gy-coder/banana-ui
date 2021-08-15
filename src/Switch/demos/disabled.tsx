import React, { useState } from 'react';
// @ts-ignore
import { Switch } from 'banana-ui';

const Demo = () => {
  const [value,setValue] = useState(false)
  return (
    <>
      <Switch disabled value={value} onChange={(value:boolean)=>setValue(value)}/>
    </>
  );
};

export default Demo;
