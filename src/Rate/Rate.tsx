import React, { useState } from 'react';
import classnames from 'classnames';
import './Rate.scss';
import RateItem from './RateItem';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
interface Props {
  /**
   * @description 默认的Value值
   * @default     0
   */
  defaultValue?: number;
  /**
   * @description Value的值改变时的回调函数
   */
  onChange?: (value: number) => void;
  /**
   * @description Rate组件的类名
   */
  className?: string;
  /**
   * @description 选中不同星级的提示信息 是长度为5的数组
   */
  hint?: string[];
  /**
   * @description 允许点击清除选中
   * @default     false
   */
  allowClear?: boolean;
  /**
   * @description 允许半选
   * @default     false
   */
  allowHalf?: boolean;
  /**
   * @description 组件是只读的
   * @default     false
   */
  readonly?: boolean;
}

const Rate: React.FC<Props> = (props) => {
  const {
    defaultValue = 0,
    onChange,
    className,
    hint,
    allowClear = false,
    allowHalf = false,
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
          <div className="g-rate-wrapper" key={item}>
            {allowHalf ? (
              <div className="g-rate-item-wrapper half">
                <RateItem
                  curValue={value}
                  value={item - 0.5}
                  onClick={(value) => handleClick(value)}
                  key={item}
                  allowClear={allowClear}
                  allowHalf={allowHalf}
                  readonly={readonly}
                />
              </div>
            ) : null}
            <div className="g-rate-item-wrapper">
              <RateItem
                curValue={value}
                value={item}
                onClick={(value) => handleClick(value)}
                key={item}
                allowClear={allowClear}
                allowHalf={allowHalf}
                readonly={readonly}
              />
            </div>
          </div>
        );
      })}
      {hint && <span className="g-rate-hint">{hint[value - 1]}</span>}
    </div>
  );
};

export default Rate;

/**
 *
 */
