import React from 'react';
//@ts-ignore
import { Popover, Button } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Popover content="我是Popover">
        <Button>top</Button>
      </Popover>
      <br/>
      <Popover content="我是Popover" position="bottom">
        <Button>bottom</Button>
      </Popover>
      <br/>
      <Popover content="我是Popover" position="left">
        <Button>left</Button>
      </Popover>
      <br/>
      <Popover content="我是Popover" position="right">
        <Button>right</Button>
      </Popover>
    </>
  );
};

export default Demo;
