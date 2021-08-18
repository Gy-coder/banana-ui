import React, { useState } from 'react';
// @ts-ignore
import { Checkbox } from 'banana-ui';

const Demo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Checkbox
        value={'check'}
        onChange={() => {
          setChecked(!checked);
        }}
        checked={checked}
      >
        一个多选框
      </Checkbox>
      <Checkbox value={'checkbox'} onChange={() => {}} disabled>
        一个被禁用的多选框
      </Checkbox>
    </>
  );
};

export default Demo;
