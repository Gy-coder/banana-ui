import React from 'react';
// @ts-ignore
import { Button, showToast } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Button
        onClick={() => {
          showToast('一条消息', { autoClose: true });
        }}
      >
        showToast
      </Button>
    </>
  );
};

export default Demo;
