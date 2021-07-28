import React from 'react';
import Button from '../Button';

const Demo = () => {
  return (
    <>
      <div>
        <Button disabled>禁用按钮</Button>
        <Button theme="link" disabled>
          禁用链接按钮
        </Button>
        <Button theme="text" disabled>
          禁用文字按钮
        </Button>
      </div>
    </>
  );
};

export default Demo;
