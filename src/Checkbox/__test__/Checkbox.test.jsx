import {
  act,
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import Checkbox from '../Checkbox';

afterEach(cleanup);

describe('测试CheckBox', () => {
  it('CheckBox可以正常渲染', () => {
    const { asFragment } = render(<Checkbox value="123">My Checkbox</Checkbox>);
    expect(screen.getByText(/My Checkbox/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it('可以disabled', () => {
    render(
      <Checkbox value="123" disabled={true}>
        My Checkbox
      </Checkbox>,
    );
    const el = screen.getByDisplayValue('123');
    expect(el).toBeDisabled();
  });
  it('可以改变值', () => {
    const Comp = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div data-testid="checkbox">
          <Checkbox
            value="one"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
          >
            Option One
          </Checkbox>
        </div>
      );
    };
    render(<Comp />);

    const el = screen.getByTestId('checkbox');
    const label = el.childNodes[0];
    expect(label.className).not.toContain('checked');
    fireEvent.click(label);
    expect(label.className).toContain('checked');
  });
});
