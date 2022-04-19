import React from 'react';
// @ts-ignore
import { Tooltip, Button } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Tooltip content="Tooltip will show on mouse enter.">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </>
  );
};

export default Demo;
