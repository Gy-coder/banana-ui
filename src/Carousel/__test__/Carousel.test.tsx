import React from 'react';
import {
  render,
  screen,
  RenderResult,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '../Carousel';

import { config } from 'react-transition-group';

config.disabled = true;

describe('test Carousel Component', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(
      <Carousel>
        <Carousel.Item>
          <div className="box box1">0</div>
        </Carousel.Item>
        <Carousel.Item style={{ background: '#fff' }}>
          <div className="box box1">1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="box box1">2</div>
        </Carousel.Item>
      </Carousel>,
    );
  });
  it('Carousel can correctly render', () => {
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(wrapper.asFragment()).toMatchSnapshot();
    expect(screen.getByText('0').parentNode).toHaveClass('active');
  });
  it('Carousel should click to next and prev', () => {
    const prevButton = wrapper.container.querySelector(
      '.g-carousel-button-left',
    );
    const nextButton = wrapper.container.querySelector(
      '.g-carousel-button-right',
    );
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText('0').parentNode).not.toHaveClass('active');
    expect(screen.getByText('1').parentNode).toHaveClass('active');
    expect(screen.getByText('2').parentNode).not.toHaveClass('active');
    fireEvent.click(nextButton);
    expect(screen.getByText('0').parentNode).not.toHaveClass('active');
    expect(screen.getByText('1').parentNode).not.toHaveClass('active');
    expect(screen.getByText('2').parentNode).toHaveClass('active');
    fireEvent.click(prevButton);
    expect(screen.getByText('0').parentNode).not.toHaveClass('active');
    expect(screen.getByText('1').parentNode).toHaveClass('active');
    expect(screen.getByText('2').parentNode).not.toHaveClass('active');
  });
  it('click dot can change page', () => {
    cleanup();
    wrapper = render(
      <Carousel>
        <Carousel.Item>
          <div className="box box1">0</div>
        </Carousel.Item>
        <Carousel.Item style={{ background: '#fff' }}>
          <div className="box box1">1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="box box1">2</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="box box1">3</div>
        </Carousel.Item>
        <Carousel.Item style={{ background: '#fff' }}>
          <div className="box box1">4</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="box box1">5</div>
        </Carousel.Item>
      </Carousel>,
    );
    const dots = wrapper.container.querySelectorAll('.g-carousel-dot');
    expect(dots.length).toEqual(6);
    expect(dots[0]).toHaveClass('active');
    for (let i = 1; i < dots.length; i++) {
      expect(dots[i]).not.toHaveClass('active');
    }
    fireEvent.click(dots[3]);
    expect(dots[3]).toHaveClass('active');
    expect(dots[0]).not.toHaveClass('active');
  });
  it('test auto play', () => {
    jest.useFakeTimers();
    cleanup();
    wrapper = render(
      <Carousel autoPlay>
        <Carousel.Item>
          <div className="box box1">0</div>
        </Carousel.Item>
        <Carousel.Item style={{ background: '#fff' }}>
          <div className="box box1">1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="box box1">2</div>
        </Carousel.Item>
      </Carousel>,
    );
    expect(screen.getByText('0').parentNode).toHaveClass('active');
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText('0').parentNode).not.toHaveClass('active');
    expect(screen.getByText('1').parentNode).toHaveClass('active');
    jest.clearAllTimers();
  });
  it('can set timeout', () => {
    jest.useFakeTimers();
    cleanup();
    wrapper = render(
      <Carousel autoPlay time={5}>
        <Carousel.Item>
          <div className="box box1">0</div>
        </Carousel.Item>
        <Carousel.Item style={{ background: '#fff' }}>
          <div className="box box1">1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="box box1">2</div>
        </Carousel.Item>
      </Carousel>,
    );
    expect(screen.getByText('0').parentNode).toHaveClass('active');
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText('0').parentNode).not.toHaveClass('active');
    expect(screen.getByText('1').parentNode).toHaveClass('active');
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText('1').parentNode).not.toHaveClass('active');
    expect(screen.getByText('2').parentNode).toHaveClass('active');
    jest.clearAllTimers();
  });
  xit('test touch event', () => {
    const outline = wrapper.container.querySelector('.g-carousel');
  });
});
