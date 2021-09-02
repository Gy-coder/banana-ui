import React from 'react';
//@ts-ignore
import { Popover, Button } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Popover content="我是Popover" trigger="hover">
        <Button>top</Button>
      </Popover>
      <br />
      <Popover content="我是Popover" position="bottom" trigger="hover">
        <Button>bottom</Button>
      </Popover>
      <br />
      <Popover content="我是Popover" position="left" trigger="hover">
        <Button>left</Button>
      </Popover>
      <br />
      <Popover content="我是Popover" position="right" trigger="hover">
        <Button>right</Button>
      </Popover>
    </>
  );
};

export default Demo;
