import Select from '../Select';
import Option from '../Option';
import React, { useState } from 'react';
import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('test select component', () => {
  let value: string, setValue: React.Dispatch<string>;
  let wrapper: RenderResult;

  const Demo = () => {
    [value, setValue] = useState('');
    const handleChange = (newValue: string) => {
      setValue(newValue);
    };
    return (
      <Select value={value} onChange={handleChange}>
        <Option value="jack" />
        <Option value="lucy" />
        <Option value="Yiminghe" />
      </Select>
    );
  };
  beforeEach(() => {
    wrapper = render(<Demo />);
  });
  it('select should render correct', () => {
    expect(wrapper.container.querySelector('.g-select')).toBeInTheDocument();
  });
  it('can click selector', async () => {
    const selector =
      wrapper.container.getElementsByClassName('g-select-selector')[0];
    fireEvent.click(selector);
    await waitFor(() => {
      expect(wrapper.queryByText('jack')).toBeInTheDocument();
      expect(wrapper.queryByText('lucy')).toBeInTheDocument();
      expect(wrapper.queryByText('Yiminghe')).toBeInTheDocument();
    });
  });
  it('should click option', async () => {
    const selector =
      wrapper.container.getElementsByClassName('g-select-selector')[0];
    fireEvent.click(selector);
    await waitFor(() => {
      expect(wrapper.queryByText('jack')).toBeInTheDocument();
    });
    fireEvent.click(wrapper.getByText('jack'));
    await waitFor(() => {
      expect(value).toBe('jack');
    });
  });
  xit('click outside should hide the dropdown', async () => {
    fireEvent.click(
      wrapper.container.getElementsByClassName('g-select-selector')[0],
    );
    // input change
    expect(wrapper.queryByText('jack')).toBeInTheDocument();
    fireEvent.click(document);
    await waitFor(() => {
      expect(wrapper.queryByText('jack')).toBeInTheDocument();
    });
    // expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
