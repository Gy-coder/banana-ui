import React, { useState } from 'react';
// @ts-ignore
import { Button, Dialog } from 'banana-ui';

const Demo: React.FC = () => {
  const [x, setX] = useState(false);
  const buttons = [
    <Button level="main">OK</Button>,
    <Button
      onClick={() => {
        setX(false);
      }}
    >
      Close
    </Button>,
  ];
  return (
    <div>
      <Button onClick={() => setX(!x)}>button</Button>
      <Dialog
        visible={x}
        onClose={() => {
          setX(false);
        }}
        buttons={buttons.map((button, index) => {
          return React.cloneElement(button, { key: index });
        })}
        closeOnClickMask={false}
      >
        Dialog
      </Dialog>
    </div>
  );
};

export default Demo;
