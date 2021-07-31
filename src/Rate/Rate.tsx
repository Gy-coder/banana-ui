import React, { useState } from 'react';
import classnames from 'classnames';
import './Rate.scss';
import RateItem from './RateItem';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  hint?: string[];
  allowClear?: boolean;
  readonly?: boolean;
}

const Rate: React.FC<Props> = (props) => {
  const {
    defaultValue = 0,
    onChange,
    className,
    hint,
    allowClear = false,
    readonly = false,
  } = props;
  const [value, setValue] = useState(defaultValue);
  const classes = classnames('g-rate', className);
  const handleClick = (value: number) => {
    setValue(value);
  };
  useDidMountEffect(() => {
    if (onChange) onChange(value);
  }, [value]);
  return (
    <div className={classes}>
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <RateItem
            curValue={value}
            value={item}
            onClick={(value) => handleClick(value)}
            key={item}
            allowClear={allowClear}
            readonly={readonly}
          />
        );
      })}
      <span className="g-rate-hint">{hint && hint[value - 1]}</span>
    </div>
  );
};

export default Rate;
