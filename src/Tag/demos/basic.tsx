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
      <Tag color="pink">pink</Tag>
      <Tag color="black">black</Tag>
      <Tag color="lightgreen">lightgreen</Tag>
      <Tag closeable onClose={onClose} color="#f60">
        closeable
      </Tag>
    </>
  );
};

export default Demo;
