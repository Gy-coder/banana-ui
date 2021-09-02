import {
  act,
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import Switch from '../Switch';

describe('测试Switch', () => {
  it('Switch可以正常渲染', () => {
    const { asFragment } = render(<Switch onChange={() => {}} value={false} />);
    expect(document.querySelector('.g-switch')).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });
  it('可以点击修改值', () => {
    const Temp = () => {
      const [value, setValue] = useState(false);
      return (
        <div data-testid="test">
          <Switch
            onChange={() => {
              setValue(!value);
            }}
            value={value}
          />
        </div>
      );
    };
    render(<Temp />);
    const el = screen.getByTestId('test').childNodes[0];
    expect(el.className).not.toContain('g-switch-checked');
    fireEvent.click(el);
    expect(el.className).toContain('g-switch-checked');
    fireEvent.click(el);
    expect(el.className).not.toContain('g-switch-checked');
  });
  it('可以disabled', () => {
    const Temp = () => {
      const [value, setValue] = useState(false);
      return (
        <div data-testid="test">
          <Switch
            disabled={true}
            onChange={() => {
              setValue(!value);
            }}
            value={value}
          />
        </div>
      );
    };
    render(<Temp />);
    const el = screen.getByTestId('test').childNodes[0];
    expect(el.className).toContain('disabled');
    expect(el.className).not.toContain('g-switch-checked');
    fireEvent.click(el);
    expect(el.className).not.toContain('g-switch-checked');
  });
  it('可以有loading', () => {
    render(<Switch onChange={() => {}} value={false} loading={true} />);
    expect(document.querySelector('.g-loadingIndicator')).toBeVisible();
  });
});
