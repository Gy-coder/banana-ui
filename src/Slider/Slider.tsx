import React, {
  FC,
  useMemo,
  useRef,
  useEffect,
  ReactNode,
  useState,
} from 'react';
import classnames from 'classnames';
import './Slider.scss';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  marks?: { [Key: number]: ReactNode };
}

// percent = (value - min) / (max - min)

const Slider: FC<Props> = (props) => {
  const { value, onChange, min = 0, max = 100, marks } = props;
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  useEffect(() => {
    const keys = Object.keys(marks || {}).map((v) => parseInt(v));
    for (let key of keys) {
      if (key < min || key > max)
        throw new Error('marks里的key值必须介于[min,max]之间');
    }
  }, []);
  const percent = useMemo(() => {
    if (value < min || value > max)
      throw new Error('The value must between min and max');
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);
  const handleClick = (e: React.MouseEvent) => {
    const x = e.clientX;
    calcPercentAndValue(x);
    handleInputFocus();
  };
  const handleMouseUp = () => {
    draggingRef.current = false;
    closeTooltip();
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    const x = e.clientX;
    calcPercentAndValue(x);
    openTooltip();
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
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    const x = e.touches[0].clientX;
    calcPercentAndValue(x);
    openTooltip();
  };
  const handleTouchEnd = () => {
    draggingRef.current = false;
    closeTooltip();
  };

  const calcPercentAndValue = (x: number) => {
    const { left, width } = sliderRef.current!.getBoundingClientRect();
    if (x >= left && x <= left + width) {
      const percent = (((x - left) / width) * 100) / 100;
      const value = Math.round((max - min) * percent + min);
      onChange(value);
    }
  };

  const openTooltip = () => setShowTooltip(true);
  const closeTooltip = () => setShowTooltip(false);

  const renderDot = () => {
    return Object.keys(marks || {}).map((item) => {
      const val = parseInt(item);
      const left = Math.round(((val - min) / (max - min)) * 100);
      return (
        <span
          className={classnames('g-slider-dot', {
            'g-slider-dot-active': val <= value,
          })}
          key={item}
          style={{
            left: `${left}%`,
          }}
        />
      );
    });
  };
  const renderText = () => {
    return Object.keys(marks || {}).map((item: string) => {
      const val = parseInt(item);
      const left = Math.round(((val - min) / (max - min)) * 100);
      return (
        <span
          className={classnames('g-slider-mark-text', {
            'g-slider-mark-text-active': val <= value,
          })}
          style={{ left: `${left}%` }}
          key={item}
          children={marks![item as keyof typeof marks]}
        />
      );
    });
  };
  const handleInputFocus = () => {
    inputRef.current!.focus();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        const Rightpercent = percent + 1;
        if (Rightpercent > 100) return;
        const Rightvalue = Math.round((max - min) * (Rightpercent / 100) + min);
        onChange(Rightvalue);
        break;
      case 'ArrowLeft':
        const Leftpercent = percent - 1;
        if (Leftpercent < 0) return;
        const Leftvalue = Math.round((max - min) * (Leftpercent / 100) + min);
        onChange(Leftvalue);
        break;
    }
  };
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('selectstart', handleSelectStart);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('selectstart', handleSelectStart);
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
      <div className="g-slider-steps">{renderDot()}</div>
      <div className="g-slider-mark">{renderText()}</div>
      <div
        className="g-slider-handle"
        style={{ left: percent + '%' }}
        onMouseDown={handleMouseDown}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
      >
        {showTooltip && <div className="g-slider-tooltip">{value}</div>}
      </div>
      <input type="text" onKeyDown={handleKeyDown} ref={inputRef} />
    </div>
  );
};

export default Slider;
