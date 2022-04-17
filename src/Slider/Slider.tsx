import React, { FC, MouseEvent, useMemo, useRef } from 'react';
import './Slider.scss';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

// percent = (value - min) / (max - min)

const Slider: FC<Props> = (props) => {
  const { value, onChange, min = 0, max = 100 } = props;
  const sliderRef = useRef<HTMLDivElement>(null);
  const percent = useMemo(() => {
    if (value < min || value > max)
      throw new Error('The value must between min and max');
    return Math.round(((value - min) / (max - min)) * 100);
  }, [value, min, max]);
  console.log(percent);
  const handleClick = (e: MouseEvent) => {
    const { left, width } = sliderRef.current!.getBoundingClientRect();
    if (e.clientX >= left && e.clientX <= left + width) {
      const percent = Math.round(((e.clientX - left) / width) * 100) / 100;
      const value = Math.round((max - min) * percent + min);
      onChange(value);
    }
  };
  return (
    <div className="g-slider" onClick={handleClick} ref={sliderRef}>
      <div className="g-slider-rail" />
      <div className="g-slider-track" style={{ width: percent + '%' }} />
      <div className="g-slider-handle" style={{ left: percent + '%' }} />
    </div>
  );
};

export default Slider;
