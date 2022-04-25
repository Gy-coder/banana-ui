import React, { FC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import './ColorPicker.scss';
import PickerBar from './PickerBar';
import PickerPanel from './PickerPanel';
import Button from '../Button/Button';
import { rgbToHex, HSBToRGB, hexToRgb, RGBToHSB } from './color';
import { useClickOutside } from '@/hooks/useClickOutside';
import { HSB, RGB } from './type';

const prefix = 'g-color-picker';

export interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const { value, onChange } = props;
  const [hsb, setHSV] = useState<HSB>({ h: 360, s: 50, b: 50 });
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const colorCode = rgbToHex(HSBToRGB(hsb));
  const ref = useRef<HTMLDivElement>(null);
  const handleClickTrigger = () => {
    setShowPopover(!showPopover);
    if (value) {
      const hsv1 = RGBToHSB(hexToRgb(value) as RGB);
      setHSV(hsv1);
    }
  };
  const handleColorChange = (newHsv: HSB) => {
    setHSV(newHsv);
  };
  const handleConfirm = () => {
    onChange(colorCode);
  };
  const handleClear = () => {
    onChange('');
  };

  useClickOutside(ref, () => {
    setShowPopover(false);
  });

  return (
    <div className={prefix} ref={ref}>
      <div
        className={classnames(prefix + '-trigger', {
          [`no-value`]: !value,
        })}
        style={{ background: value ? value : 'transparent' }}
        onClick={handleClickTrigger}
      />
      {showPopover && (
        <div className={prefix + '-popover'}>
          <main>
            <PickerPanel hsv={hsb} onPanelChange={handleColorChange} />
            <PickerBar hsv={hsb} onBarChange={handleColorChange} />
          </main>
          <footer>
            <span className={prefix + '-colorcode'}>{colorCode}</span>
            <div className="buttons">
              <Button onClick={handleClear} size="small" theme="text">
                清空
              </Button>
              <Button onClick={handleConfirm} size="small" level="main">
                确定
              </Button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
