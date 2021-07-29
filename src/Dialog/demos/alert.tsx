import React from 'react';
// @ts-ignore
import { Button, alert } from 'banana-ui';
const Demo = () => {
  return (
    <>
      <Button onClick={() => alert('我是alert', '这是标题')}>alert</Button>
      <Button onClick={() => alert('我是alert', '这是标题', false)}>
        alert
      </Button>
    </>
  );
};

export default Demo;
