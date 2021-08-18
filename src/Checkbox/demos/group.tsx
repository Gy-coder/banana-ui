import React, { useState } from 'react';
// @ts-ignore
import { Checkbox, CheckboxGroup } from 'banana-ui';

const Demo = () => {
  const [values, setValues] = useState<Array<string>>(['mutton']);
  const handleChange = (newValues: Array<string>) => {
    setValues(newValues);
  };
  return (
    <>
      被选中的项: {values.join(',')}
      <CheckboxGroup values={values} onChange={handleChange}>
        <Checkbox value="mutton">羔羊肉</Checkbox>
        <Checkbox value="beef">牛肉</Checkbox>
        <Checkbox value="fried chicken">炸鸡</Checkbox>
        <Checkbox value="bacon">培根</Checkbox>
      </CheckboxGroup>
    </>
  );
};

export default Demo;
