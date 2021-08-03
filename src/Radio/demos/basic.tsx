import React, { useState } from 'react';
// @ts-ignore
import { Radio } from 'banana-ui';

const Demo = () => {
  const [x, setX] = useState('1');
  const onChange = (value: any) => {
    setX(value);
  };
  return (
    <>
      <Radio value={'汉堡'} onChange={onChange} checked={x === '汉堡'}>
        🍔
      </Radio>
      <Radio value={'薯条'} onChange={onChange} checked={x === '薯条'}>
        🍟
      </Radio>
    </>
  );
};

export default Demo;
