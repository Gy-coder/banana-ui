import {
  act,
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import Radio from '../Radio';
import Checkbox from '../../Checkbox/Checkbox';

afterEach(cleanup);

describe('测试CheckBox', () => {
  it('CheckBox可以正常渲染', () => {
    const { asFragment } = render(<Radio value="123">My Radio</Radio>);
    expect(screen.getByText(/My Radio/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it('可以disabled', () => {
    render(
      <Radio value="123" disabled={true}>
        My Radio
      </Radio>,
    );
    const el = screen.getByDisplayValue('123');
    expect(el).toBeDisabled();
  });
  it('可以点击改变checked', () => {
    const Temp = () => {
      const [checked, setChecked] = useState(false);
      return (
        <div data-testid="test">
          <Radio
            checked={checked}
            value={'132'}
            onChange={() => {
              setChecked(true);
            }}
          >
            My Radio
          </Radio>
        </div>
      );
    };
    render(<Temp />);
    const el = screen.getByTestId('test');
    const label = el.childNodes[0];
    expect(label.className).not.toContain('checked');
    fireEvent.click(label);
    expect(label.className).toContain('checked');
  });
});
