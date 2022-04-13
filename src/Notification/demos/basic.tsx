import React from 'react';
//@ts-ignore
import { Button, Notification } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Button
        onClick={() =>
          Notification.open({ title: '通知框', content: '通知一下你' })
        }
        level="main"
      >
        默认5秒后关闭
      </Button>
      <Button
        onClick={() =>
          Notification.open({ time: 0, title: '通知框', content: '通知一下你' })
        }
        level="main"
      >
        不会关闭
      </Button>
      <Button
        onClick={() =>
          Notification.open({ time: 3, title: '通知框', content: '通知一下你' })
        }
        level="main"
      >
        3秒后关闭
      </Button>
    </>
  );
};

export default Demo;
