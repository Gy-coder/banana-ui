import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Input from './Input';

afterEach(cleanup);

it('renders correctly', () => {
  render(
    <Input
      value="hello"
      onChange={(ev) => (document.title = ev.target.value)}
    />,
  );

  expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
});

it('should changes the input value', () => {
  render(
    <Input
      defaultValue="hello"
      onChange={(ev) => (document.title = ev.target.value)}
    />,
  );

  const el = screen.getByDisplayValue('hello') as HTMLInputElement;
  fireEvent.change(el, { target: { value: 123 } });
  expect(el.value).toBe('123');
});

it('should shows danger text', () => {
  render(<Input data-testid="input" error="用户名错误" />);

  expect(document.querySelector('.error-message')).toBeVisible();
});
