import React from 'react';
// @ts-ignore
import { Button, showToast } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Button
        onClick={() => {
          showToast('一条消息', {
            closeButton: { text: '关闭' },
          });
        }}
      >
         具有CloseButton
      </Button>
    </>
  );
};

export default Demo;
