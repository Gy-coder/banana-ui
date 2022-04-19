import React from 'react';
// @ts-ignore
import { Tooltip, Button } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Tooltip content="Tooltip will show on mouse enter." color="#F60">
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </>
  );
};

export default Demo;
