import {
  act,
  render,
  cleanup,
  screen,
  fireEvent,
  RenderResult,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import Drawer, { DrawerProps } from '../Drawer';
import Button from '../../Button/Button';

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
    wrapper = render(<Demo />);
    btn = screen.getByText('show');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(visible).toBeTruthy();
    expect(screen.queryByText('title')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
    expect(
      wrapper.container.querySelector('.g-drawer.g-drawer-right.g-drawer-open'),
    ).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('should close', async () => {
    wrapper = render(<Demo />);
    const closeBtn = document.getElementsByClassName('close-button')[0];
    fireEvent.click(closeBtn);
    await waitForElementToBeRemoved(() => screen.queryAllByText('title'));
  });
});
