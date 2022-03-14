import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Affix from '../Affix';

let wrapper: RenderResult;
describe('test affix', () => {
  beforeEach(() => {
    wrapper = render(
      <Affix distance={20}>
        <div>Affix</div>
      </Affix>,
    );
  });
  it('Affix shoule render correct', () => {
    expect(wrapper.queryByText('Affix')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('Affix should have position fixed', () => {
    fireEvent.scroll(window, { target: { screenY: 1000 } });
    expect(
      wrapper.container.querySelectorAll('.g-affix-wrapper')[0],
    ).toHaveStyle('position: fixed');
  });
});
