import React from 'react';
// @ts-ignore
import { Button, showToast } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Button
        onClick={() => {
          showToast('一条消息', {
            position: 'top',
            autoClose: true,
          });
        }}
      >
        上
      </Button>
      <Button
        onClick={() => {
          showToast('一条消息', {
            position: 'middle',
            autoClose: true,
          });
        }}
      >
        中
      </Button>
      <Button
        onClick={() => {
          showToast('一条消息', {
            position: 'bottom',
            autoClose: true,
          });
        }}
      >
        下
      </Button>
    </>
  );
};

export default Demo;
