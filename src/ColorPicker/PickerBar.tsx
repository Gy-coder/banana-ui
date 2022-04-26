import React, { FC, useEffect, useRef } from 'react';
import { HSB } from './type';

export interface Props {
  hsv: HSB; // 0 - 360
  onBarChange: (value: HSB) => void;
}

const PickerBar: FC<Props> = (props) => {
  const { hsv, onBarChange } = props;
  const { h } = hsv;
  const triggerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<boolean>(false);
  useEffect(() => {
    const percent = Math.round((h / 360) * 100) / 100;
    triggerRef.current!.style.top = `${percent * 100}%`;
  }, [hsv]);
  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    const y = e.clientY;
    caclValue(y);
  };
  const handleMouseDown = () => {
    dragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
  };
  const handleSelectStart = (e: Event) => {
    if (dragging.current) e.preventDefault();
  };
  const handleClick = (e: React.MouseEvent) => {
    const y = e.clientY;
    caclValue(y);
  };
  const caclValue = (y: number) => {
    const { top, height } = barRef.current!.getBoundingClientRect();
    if (y > top && y < height + top + 1) {
      const percent = Math.round(((y - top) / height) * 100) / 100;
      // triggerRef.current.style.top = `${percent * 100}%`;
      const val = Math.round(360 * percent);
      onBarChange({ ...hsv, h: val });
    }
  };
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectstart', handleSelectStart);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);
  return (
    <div className="picker-bar" ref={barRef} onClick={handleClick}>
      <div
        className="picker-bar-trigger"
        ref={triggerRef}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default PickerBar;
