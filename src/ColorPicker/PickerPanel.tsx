import React, { FC, useRef, useEffect } from 'react';
import { HSBToRGB, RGBToHSB } from './color';
import { HSB } from './type';

export interface Props {
  hsv: HSB;
  onPanelChange: (hsv: HSB) => void;
}

const PickerPanel: FC<Props> = (props) => {
  const { hsv, onPanelChange } = props;
  const { h, s, b } = hsv;
  const background = HSBToRGB({ h, s: 100, b: 100 });
  const panelRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<boolean>(false);
  useEffect(() => {
    const percentX = s / 100;
    const percentY = b / 100;
    sliderRef.current!.style.left = `${percentX * 100}%`;
    sliderRef.current!.style.top = `${Math.abs(percentY * 100 - 100)}%`;
  }, [hsv]);
  const handleMouseUp = () => {
    draggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    const x = e.clientX,
      y = e.clientY;
    calcXAndY(x, y);
  };
  const handleMouseDown = () => {
    draggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
  };
  const handleSelectStart = (e: Event) => {
    if (draggingRef.current) e.preventDefault();
  };
  const handleClick = (e: React.MouseEvent) => {
    const x = e.clientX,
      y = e.clientY;
    calcXAndY(x, y);
  };
  const calcXAndY = (x: number, y: number) => {
    const { top, left, width, height } =
      panelRef.current!.getBoundingClientRect();
    if (x < left || x > left + width || y < top || y > top + height + 1) return;
    const percentX = ((x - left) / width) * 100;
    const percentY = ((y - top) / height) * 100;
    onPanelChange({
      h,
      s: Math.round(percentX),
      b: Math.round(Math.abs(percentY - 100)),
    });
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
    <div
      className="picker-panel"
      style={{
        background: `rgb(${background.r},${background.g},${background.b})`,
      }}
      ref={panelRef}
      onClick={handleClick}
    >
      <div className="picker-panel-white" />
      <div className="picker-panel-black" />
      <div
        className="picker-panel-slider"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default PickerPanel;
