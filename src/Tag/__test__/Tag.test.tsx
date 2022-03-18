import React from 'react';
import Tag from '../Tag';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test Tag component', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    const Demo = () => {
      const onClose = jest.fn();
      return (
        <Tag closeable onClose={onClose}>
          Tag
        </Tag>
      );
    };
    wrapper = render(<Demo />);
  });
  it('Tag should render correnct', () => {
    expect(wrapper.queryByText('Tag')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  xit('Tag should be close', () => {
    cleanup();
    const onClose = jest.fn();
    wrapper = render(
      <Tag closeable onClose={onClose}>
        Tag
      </Tag>,
    );
    act(() => {
      fireEvent.click(
        wrapper.container.getElementsByClassName('g-tag-close-button')[0],
      );
    });
    expect(onClose).toBeCalledTimes(1);
    expect(wrapper.queryByText('Tag')).not.toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
