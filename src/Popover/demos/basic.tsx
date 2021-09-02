import React from 'react';
//@ts-ignore
import { Popover, Button } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <span>
        <Popover content="我是Popover">
          <Button>top</Button>
        </Popover>
      </span>
      <span style={{ marginLeft: 8 }}>
        <Popover content="我是Popover" position="bottom">
          <Button>bottom</Button>
        </Popover>
      </span>

      <span style={{ marginLeft: 8 }}>
        <Popover content="我是Popover" position="left">
          <Button>left</Button>
        </Popover>
      </span>

      <span style={{ marginLeft: 8 }}>
        <Popover content="我是Popover" position="right">
          <Button>right</Button>
        </Popover>
      </span>
    </>
  );
};

export default Demo;
