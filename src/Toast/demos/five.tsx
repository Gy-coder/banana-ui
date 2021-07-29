import React from 'react';
// @ts-ignore
import { Button, showToast } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Button
        onClick={() => {
          showToast('一条消息', { autoClose: true, autoCloseDelay: 5 });
        }}
      >
        5s后关闭
      </Button>
    </>
  );
};

export default Demo;
