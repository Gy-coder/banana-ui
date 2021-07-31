import React from 'react';
// @ts-ignore
import { Rate } from 'banana-ui';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Demo = () => {
  return (
    <>
      <Rate
        defaultValue={3}
        onChange={(value: number) => alert(`你选中了${value}`)}
        hint={desc}
      />
    </>
  );
};

export default Demo;
