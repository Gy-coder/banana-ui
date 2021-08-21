import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import Collapse from './Collapse';
import CollapseItem from './CollapseItem';

afterEach(cleanup);

it('renders correctly', () => {
  render(
    <Collapse selected="one">
      <CollapseItem title="Title One" name="one">
        Content One
      </CollapseItem>
      <CollapseItem title="Title Two" name="two">
        Content Two
      </CollapseItem>
    </Collapse>,
  );

  expect(screen.getByText('Content One')).toBeVisible();
});

it('collapse after click', () => {
  function Render() {
    const [selected, setSelected] = useState();

    return (
      <Collapse selected={selected} onChange={setSelected}>
        <CollapseItem title="Title One" name="one">
          Content One
        </CollapseItem>
        <CollapseItem title="Title Two" name="two">
          Content Two
        </CollapseItem>
      </Collapse>
    );
  }

  render(<Render />);

  expect(screen.queryByText('Content One')).toBeFalsy();
  fireEvent.click(screen.getByText('Title One'));
  expect(screen.getByText('Content One')).toBeVisible();
});
