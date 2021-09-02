import {
  act,
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import Collapse from '../Collapse';
import CollapseItem from '../CollapseItem';

afterEach(cleanup);

describe('测试Collapse组件', () => {
  it('renders correctly', () => {
    const Temp = () => {
      const [selected, setSelected] = useState([]);
      const onChange = (newSelected) => setSelected(newSelected);
      return (
        <Collapse selected={selected} onChange={onChange}>
          <CollapseItem title="标题一" name="1">
            内容1
          </CollapseItem>
          <CollapseItem title="标题二" name="2">
            内容2
          </CollapseItem>
          <CollapseItem title="标题三" name="3">
            内容3
          </CollapseItem>
        </Collapse>
      );
    };
    const { asFragment } = render(<Temp />);
    expect(document.querySelector('.g-collapse')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it('可以点击某个title，让它的content出现', () => {
    const Temp = () => {
      const [selected, setSelected] = useState([]);
      const onChange = (newSelected) => setSelected(newSelected);
      return (
        <Collapse selected={selected} onChange={onChange}>
          <CollapseItem title="标题一" name="1">
            内容1
          </CollapseItem>
          <CollapseItem title="标题二" name="2">
            内容2
          </CollapseItem>
          <CollapseItem title="标题三" name="3">
            内容3
          </CollapseItem>
        </Collapse>
      );
    };
    const { asFragment } = render(<Temp />);
    fireEvent.click(screen.getByText('标题一'));
    expect(screen.getByText('内容1')).toBeVisible();
    fireEvent.click(screen.getByText('标题二'));
    expect(screen.getByText('内容1')).toBeVisible();
    expect(screen.getByText('内容2')).toBeVisible();
  });
  it('带有singled', () => {
    const Temp = () => {
      const [selected, setSelected] = useState([]);
      const onChange = (newSelected) => setSelected(newSelected);
      return (
        <Collapse selected={selected} onChange={onChange} multiple={false}>
          <CollapseItem title="标题一" name="1">
            内容1
          </CollapseItem>
          <CollapseItem title="标题二" name="2">
            内容2
          </CollapseItem>
          <CollapseItem title="标题三" name="3">
            内容3
          </CollapseItem>
        </Collapse>
      );
    };
    const { asFragment } = render(<Temp />);
    fireEvent.click(screen.getByText('标题一'));
    expect(screen.getByText('内容1')).toBeVisible();
    fireEvent.click(screen.getByText('标题二'));
    expect(screen.queryByText('内容1')).not.toBeInTheDocument();
    expect(screen.getByText('内容2')).toBeVisible();
  });
});
