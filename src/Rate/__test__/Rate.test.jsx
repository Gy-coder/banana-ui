import {
  act,
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import Rate from '../Rate';

afterEach(cleanup);

describe('测试Rate', () => {
  it('可以正常渲染', () => {
    const Demo = () => {
      const [value, setValue] = useState(0);
      const handleChange = (value) => {
        setValue(value);
      };
      return (
        <>
          <Rate value={value} onChange={handleChange} />
        </>
      );
    };
    const { asFragment } = render(<Demo />);
    expect(document.querySelector('.g-rate')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it('可以点击变亮', () => {
    const Demo = () => {
      const [value, setValue] = useState(0);
      const handleChange = (value) => {
        setValue(value);
      };
      return (
        <>
          <Rate value={value} onChange={handleChange} />
        </>
      );
    };
    render(<Demo />);
    const el = document.querySelector('.g-rate');
    fireEvent.click(el.childNodes[2].childNodes[0].childNodes[0]);
    for (let i = 0; i <= 2; i++) {
      expect(el.childNodes[i].childNodes[0].childNodes[0]).toHaveClass(
        'active',
      );
    }
  });
  it('带有提示信息', () => {
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    const Demo = () => {
      const [value, setValue] = useState(3);
      const handleChange = (value) => {
        setValue(value);
      };
      return (
        <>
          <Rate value={value} onChange={handleChange} hint={desc} />
        </>
      );
    };
    render(<Demo />);
    expect(document.querySelector('.g-rate-hint')).toBeInTheDocument();
    expect(screen.getByText('normal')).toBeVisible();
  });
});
