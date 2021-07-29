import React from 'react';
// @ts-ignore
import { Button } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <div>
        <Button loading>加载中</Button>
        <Button>加载完毕</Button>
      </div>
    </>
  );
};

export default Demo;
