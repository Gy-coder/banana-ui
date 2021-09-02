import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import Input from '../Input';

afterEach(cleanup);

describe('测试Input组件', () => {
  it('能够正常render', () => {
    const { asFragment } = render(<Input value={'123'} onChange={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('能够修改值', () => {
    render(
      <Input
        defaultValue="hello"
        onChange={(ev) => (document.title = ev.target.value)}
      />,
    );

    const el = screen.getByDisplayValue('hello');
    fireEvent.change(el, { target: { value: 'i love u' } });
    expect(el.value).toBe('i love u');
  });
  it('能显示错误', () => {
    render(<Input data-testid="input" error="用户名错误" />);
    expect(document.querySelector('.error-message')).toBeVisible();
  });
  it('可以disabled', () => {
    const handleChange = jest.fn();
    render(
      <Input
        defaultValue="hello"
        onChange={(e) => handleChange(e)}
        disabled={true}
      />,
    );
    const el = screen.getByDisplayValue('hello');
    expect(el).toBeDisabled();
  });
});
