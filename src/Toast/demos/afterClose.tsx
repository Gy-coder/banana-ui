import React from 'react';
// @ts-ignore
import { Button, showToast } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Button
        onClick={() => {
          showToast('一条消息', {
            autoClose: true,
            afterClose: () => console.log('afterClose'),
          });
        }}
      >
         afterClose
      </Button>
      <br />
      <Button
        onClick={() => {
          showToast('一条消息', {
            closeButton: { text: '关闭' },
            afterClose: () => console.log('afterClose'),
          });
        }}
      >
         afterClose + closeButton
      </Button>
    </>
  );
};

export default Demo;
