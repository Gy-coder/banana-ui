import React, { useState, useEffect } from 'react';
//@ts-ignore
import { Select } from 'banana-ui';

const Option = Select.Option;

const Demo = () => {
  const [value, setValue] = useState<string>('');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div style={{ padding: 20 }}>
      <p>你选中的value为: {value}</p>
      <Select value={value} onChange={handleChange}>
        <Option value="jack" />
        <Option value="lucy" />
        <Option value="Yiminghe" />
      </Select>
    </div>
  );
};

export default Demo;
