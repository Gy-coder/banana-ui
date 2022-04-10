import React, { useState } from 'react';
//@ts-ignore
import { Button, Drawer, RadioGroup, Radio } from 'banana-ui';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState('right');
  const handleClose = () => {
    setVisible(false);
  };
  const handleChange = (value: string) => {
    setX(value);
  };
  return (
    <>
      <RadioGroup value={x} onChange={handleChange}>
        <Radio value={'left'}>left</Radio>
        <Radio value={'right'}>right</Radio>
        <Radio value={'top'}>top</Radio>
        <Radio value={'bottom'}>bottom</Radio>
      </RadioGroup>
      <br />
      <Button onClick={() => setVisible(true)}>show</Button>
      <Drawer
        placement={x}
        visible={visible}
        onClose={handleClose}
        title="这是一个Drawer"
        footer="footer"
        showMask={false}
      >
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
        <p>title</p>
      </Drawer>
    </>
  );
};

export default Demo;
