import React from 'react';
// @ts-ignore
import { Tag } from 'banana-ui';

const Demo = () => {
  const onClose = () => {
    console.log('close');
  };
  return (
    <>
      <Tag>Tag</Tag>
      <Tag closeable onClose={onClose}>
        closeable
      </Tag>
    </>
  );
};

export default Demo;
