import React from 'react';
// @ts-ignore
import { Affix } from 'banana-ui';
import './basic.css';

const Demo = () => {
  return (
    <>
      <p>请打开下方的显示代码来体验Affix</p>
      <Affix distance={20}>
        <div className="demo">Affix</div>
      </Affix>
    </>
  );
};

export default Demo;
