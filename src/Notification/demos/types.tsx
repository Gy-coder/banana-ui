import React from 'react';
//@ts-ignore
import { Button, Notification } from 'banana-ui';

const Demo = () => {
  return (
    <>
      <Button
        onClick={() =>
          Notification.open({
            time: 0,
            title: '通知框',
            content: '通知一下你',
            type: 'success',
          })
        }
      >
        成功
      </Button>
      <Button
        onClick={() =>
          Notification.open({
            time: 0,
            title: '通知框',
            content: '通知一下你',
            type: 'error',
          })
        }
      >
        错误
      </Button>
      <Button
        onClick={() =>
          Notification.open({
            time: 5,
            title: '通知框',
            content: '通知一下你',
            type: 'warning',
          })
        }
      >
        警告
      </Button>
      <Button
        onClick={() =>
          Notification.open({
            time: 5,
            title: '通知框',
            content: '通知一下你',
            type: 'info',
          })
        }
      >
        提示
      </Button>
    </>
  );
};

export default Demo;
