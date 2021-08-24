import {
  act,
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import React, { useState } from 'react';
import Checkbox from './Checkbox';

afterEach(cleanup);

it('renders correctly', () => {
  const { asFragment } = render(
    <Checkbox value="one" checked onChange={() => {}}>
      Option One
    </Checkbox>,
  );

  expect(screen.getByText(/Option One/)).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});

it('should toggle checked correctly', () => {
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
