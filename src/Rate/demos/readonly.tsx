import React from 'react';
// @ts-ignore
import { Rate } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Rate
        defaultValue={3}
        onChange={(value: number) => alert(`你选中了${value}`)}
        readonly
      />
    </>
  );
};

export default Demo;
