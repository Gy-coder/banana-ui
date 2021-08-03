import React, { useState } from 'react';
// @ts-ignore
import { RadioGroup, Radio } from 'banana-ui';

const Demo = () => {
  const [x, setX] = useState(null);
  const onChange = (value: any) => {
    console.log(value);
    setX(value);
  };
  return (
    <>
      你选中的Value:{x}
      <RadioGroup value={x} onChange={onChange}>
        <Radio value={'CocaCola'}>可口可乐</Radio>
        <Radio value={'Pepsi'}>百事可乐</Radio>
        <Radio value={'mineralWater'}>矿泉水</Radio>
      </RadioGroup>
    </>
  );
};

export default Demo;
