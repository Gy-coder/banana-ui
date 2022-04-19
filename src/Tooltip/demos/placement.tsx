import React from 'react';
// @ts-ignore
import { Tooltip, Button } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Tooltip content="top" placement="top">
        <Button level="main">right</Button>
      </Tooltip>
      <Tooltip content="left" placement="left">
        <Button level="main">left</Button>
      </Tooltip>
      <Tooltip content="bottom" placement="bottom">
        <Button level="main">bottom</Button>
      </Tooltip>
      <Tooltip content="right" placement="right">
        <Button level="main">right</Button>
      </Tooltip>
    </>
  );
};

export default Demo;
