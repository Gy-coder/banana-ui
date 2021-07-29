import React from 'react';
// @ts-ignore
import { Button, modal } from 'banana-ui';
const Demo = () => {
  return (
    <>
      <Button onClick={() => modal('你好')}>modal</Button>
    </>
  );
};

export default Demo;
