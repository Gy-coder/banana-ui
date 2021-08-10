import React, { useState } from 'react';
// @ts-ignore
import { Tree, sourceDataItem } from 'banana-ui';

const Demo = () => {
  const [array] = useState([
    {
      text: '1',
      value: '1',
      children: [
        {
          text: '1.1',
          value: '1.1',
          children: [
            { text: '1.1.1', value: '1.1.1' },
            { text: '1.1.2', value: '1.1.2' },
          ],
        },
        { text: '1.2', value: '1.2' },
      ],
    },
    {
      text: '2',
      value: '2',
      children: [
        { text: '2.1', value: '2.1' },
        { text: '2.2', value: '2.2' },
      ],
    },
  ]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const onChange = (newSelected: string) => {
    setSelectedValue(newSelected);
  };
  return (
    <>
      {selectedValue}
      <Tree sourceData={array} selected={selectedValue} onChange={onChange} />
    </>
  );
};

export default Demo;
