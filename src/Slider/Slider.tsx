import React, {
  FC,
  useMemo,
  useRef,
  useEffect,
  TouchEventHandler,
} from 'react';
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
  const draggingRef = useRef<boolean>(false);
  const percent = useMemo(() => {
    if (value < min || value > max)
      throw new Error('The value must between min and max');
    return Math.round(((value - min) / (max - min)) * 100);
  }, [value, min, max]);
  const handleClick = (e: React.MouseEvent) => {
    const { left, width } = sliderRef.current!.getBoundingClientRect();
    if (e.clientX >= left && e.clientX <= left + width) {
      const percent = Math.round(((e.clientX - left) / width) * 100) / 100;
      const value = Math.round((max - min) * percent + min);
      onChange(value);
    }
  };
  const handleMouseUp = () => {
    draggingRef.current = false;
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (draggingRef.current === false) return;
    const { left, width } = sliderRef.current!.getBoundingClientRect();
    if (e.clientX >= left && e.clientX <= left + width) {
      const percent = Math.round(((e.clientX - left) / width) * 100) / 100;
      const value = Math.round((max - min) * percent + min);
      onChange(value);
    }
  };
  const handleMouseDown = () => {
    draggingRef.current = true;
  };
  const handleSelectStart = (e: Event) => {
    if (draggingRef.current) e.preventDefault();
  };
  const handleTouchStart = () => {
    draggingRef.current = true;
  };
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const { left, width } = sliderRef.current!.getBoundingClientRect();
    if (e.touches[0].clientX >= left && e.touches[0].clientX <= left + width) {
      const percent =
        Math.round(((e.touches[0].clientX - left) / width) * 100) / 100;
      const value = Math.round((max - min) * percent + min);
      onChange(value);
    }
  };
  const handleTouchEnd = () => {
    draggingRef.current = false;
  };
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('selectstart', handleSelectStart);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.addEventListener('selectstart', handleSelectStart);
    };
  }, []);

  return (
    <div
      className="g-slider"
      onClick={handleClick}
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="g-slider-rail" />
      <div className="g-slider-track" style={{ width: percent + '%' }} />
      <div
        className="g-slider-handle"
        style={{ left: percent + '%' }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Slider;
