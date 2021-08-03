import React, { useState } from 'react';
// @ts-ignore
import { Radio } from 'banana-ui';

const Demo = () => {
  const [x, setX] = useState('薯条');
  const onChange = (value: any) => {
    setX(value);
  };
  return (
    <>
      <Radio value={'汉堡'} onChange={onChange} checked={x === '汉堡'} disabled>
        🍔
      </Radio>
      <Radio value={'薯条'} onChange={onChange} checked={x === '薯条'} disabled>
        🍟
      </Radio>
    </>
  );
};

export default Demo;
