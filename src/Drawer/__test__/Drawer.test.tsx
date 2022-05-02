import {
  act,
  render,
  screen,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import Drawer, { DrawerProps } from '../Drawer';
import Button from '../../Button/Button';
import { config } from 'react-transition-group';

config.disabled = true;

let visible: boolean, setVisible: Function;
const Demo = () => {
  [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button onClick={() => setVisible(true)}>show</Button>
      <Drawer
        placement="right"
        visible={visible}
        onClose={handleClose}
        title="这是一个Drawer"
        footer="footer"
      >
        <p>title</p>
      </Drawer>
    </>
  );
};

let wrapper: RenderResult, btn: HTMLButtonElement;

describe('Testing Drawer component', () => {
  it('Drawer should be render correct', async () => {
    act(() => {
      wrapper = render(<Demo />, { container: document.body });
    });
    btn = screen.getByText('show');
    expect(btn).toBeInTheDocument();
    act(() => {
      fireEvent.click(btn);
    });
    await waitFor(() => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
    expect(visible).toBeTruthy();
    expect(screen.queryByText('title')).toBeInTheDocument();
    expect(document.querySelector('.g-drawer-open')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('should close', async () => {
    wrapper = render(<Demo />, { container: document.body });
    btn = screen.getByText('show');
    act(() => {
      fireEvent.click(btn);
    });
    const closeBtn = document.getElementsByClassName('close-button')[0];
    act(() => {
      fireEvent.click(closeBtn);
    });
    expect(
      wrapper.container.querySelector(
        '.g-drawer.g-drawer-right.g-drawer-close',
      ),
    ).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
