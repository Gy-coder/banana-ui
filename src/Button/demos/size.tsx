import React from 'react';
import Button from '../Button';

const Demo = () => {
  return (
    <>
      <div>
        <Button size="big">大按钮</Button>
        <Button>普通按钮</Button>
        <Button size="small">小按钮</Button>
      </div>
      <div>
        <Button theme="link" size="big">
          大按钮
        </Button>
        <Button theme="link">普通按钮</Button>
        <Button size="small" theme="link">
          小按钮
        </Button>
      </div>
      <div>
        <Button size="big" theme="text">
          大大大
        </Button>
        <Button theme="text">普普通</Button>
        <Button size="small" theme="text">
          小小小
        </Button>
      </div>
    </>
  );
};

export default Demo;
