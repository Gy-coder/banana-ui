import React from 'react';
// @ts-ignore
import { Button, confirm } from 'banana-ui';
const Demo = () => {
  return (
    <>
      <Button
        onClick={() =>
          confirm(
            'I am confirm',
            () => {
              console.log('success');
            },
            () => {
              console.log('fail');
            },
            '确定吗',
            false,
          )
        }
      >
        confirm
      </Button>
    </>
  );
};

export default Demo;
