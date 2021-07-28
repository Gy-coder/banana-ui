import React from 'react';
import Button from '../Button';

const Demo = () => {
  return (
    <>
      <div>
        <Button onClick={() => console.log('你好')}>你好</Button>
        <Button theme="link">你好</Button>
        <Button theme="text">你好</Button>
      </div>
    </>
  );
};

export default Demo;
