import React, { useState, useEffect } from 'react';
//@ts-ignore
import { Select } from 'banana-ui';

const Option = Select.Option;

const children: any = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i} value={i.toString(36) + i} />);
}

const Demo = () => {
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (newValue: string[]) => {
    setValue(newValue);
  };
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div style={{ padding: 20 }}>
      <p>你选中的value为: {value}</p>
      <Select
        placeholder="多选框"
        value={value}
        onChange={handleChange}
        multiple
        style={{ width: '100%' }}
      >
        {children}
      </Select>
    </div>
  );
};

export default Demo;
