import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import React, { useState } from 'react';
import '@testing-library/jest-dom';
import AutoComplete, {
  AutoCompleteProps,
  DataSourceType,
} from '../AutoComplete';

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) =>
    testArray.filter((item) => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: 'This is a placeholder',
};

const testProps2: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: 'auto-completed',
  renderOption: (item: DataSourceType<{ number?: number }>) => (
    <span>
      {item.value} - {item.number}
    </span>
  ),
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

const Demo: React.FC<AutoCompleteProps> = (props) => {
  const [value, setValue] = useState('');
  const onChange = (value: string) => {
    setValue(value);
  };
  return <AutoComplete value={value} onChange={onChange} {...props} />;
};

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<Demo {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      'This is a placeholder',
    ) as HTMLInputElement;
  });
  it('should render correct', () => {
    cleanup();
    const { asFragment } = render(
      <AutoComplete data-testid="auto" {...testProps} />,
    );
    expect(screen.getByTestId('auto')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
  it('test basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } });
    expect(inputNode.value).toBe('a');
    await waitFor(() => {
      expect(screen.queryByText('ab')).toBeInTheDocument();
    });
    expect(
      wrapper.container.querySelectorAll('.g-auto-complete-suggestion-item')
        .length,
    ).toBe(2);
    expect(wrapper.asFragment()).toMatchSnapshot();
    fireEvent.click(wrapper.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: 'ab',
      number: 11,
    });
    expect(inputNode.value).toBe('ab');
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('should provide keyborad support', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText('ab');
    const secondResult = wrapper.queryByText('abc');

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(wrapper.queryByText('ab')).toHaveClass('item-highlighted');
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(wrapper.queryByText('abc')).toHaveClass('item-highlighted');
    // // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(wrapper.queryByText('ab')).toHaveClass('item-highlighted');
    // // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: 'ab',
      number: 11,
    });
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
  });
  it('renderOption should generate the right template', async () => {
    cleanup();
    wrapper = render(<Demo {...testProps2} />);
    inputNode = wrapper.getByPlaceholderText(
      'auto-completed',
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await waitFor(() => {
      expect(wrapper.queryByText('ab - 11')).toBeInTheDocument();
    });
    expect(wrapper.asFragment()).toMatchSnapshot();
    expect(
      wrapper.container.querySelectorAll('.g-auto-complete-suggestion-item')
        .length,
    ).toEqual(2);
  });
});
