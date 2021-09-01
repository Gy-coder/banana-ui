import React, { useState } from 'react';
// @ts-ignore
import { Switch } from 'banana-ui';

const Demo = () => {
  const [value, setValue] = useState(false);
  return (
    <>
      <Switch
        loading
        value={value}
        onChange={(value: boolean) => setValue(value)}
      />
      <br />
      <Switch
        loading
        disabled
        value={value}
        onChange={(value: boolean) => setValue(value)}
      />
    </>
  );
};

export default Demo;
