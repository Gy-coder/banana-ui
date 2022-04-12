import React from 'react';
//@ts-ignore
import { Carousel } from 'banana-ui';
import './demos.scss';

const Demo = () => {
  return (
    <Carousel autoPlay={false}>
      <Carousel.Item>
        <div className="box box1">0</div>
      </Carousel.Item>
      <Carousel.Item style={{ background: '#fff' }}>
        <div className="box box1">1</div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="box box1">2</div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Demo;
