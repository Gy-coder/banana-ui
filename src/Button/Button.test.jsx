import React from 'react';
import {
  render,
  act,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import Button from './Button';

afterEach(cleanup);

it('renders correctly', () => {
  const { asFragment } = render(<Button>Click Me</Button>);
  expect(screen.getByText(/Click Me/i)).toBeTruthy();
  expect(asFragment()).toMatchSnapshot();
});

it('accept onClick and rest props', () => {
  const handleClick = jest.fn();
  render(
    <Button data-testid="button" onClick={handleClick}>
      Click
    </Button>,
  );
  act(() => {
    fireEvent.click(screen.getByTestId('button'));
  });
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('should be disabled', () => {
  const handleClick = jest.fn();
  render(
    <Button theme="link" disabled onClick={handleClick}>
      Click
    </Button>,
  );
  act(() => {
    fireEvent.click(screen.getByRole('button'));
  });
  expect(handleClick).not.toHaveBeenCalled();
});
