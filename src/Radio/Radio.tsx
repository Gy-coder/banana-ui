import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import './Radio.scss';
export interface Props {
  /**
   * @description 选中的状态
   */
  checked: boolean;
  /**
   * @description input的value值
   */
  value: any;
  /**
   * @description value改变时的回调函数
   */
  onChange: (value: any) => void;
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
}

const Radio: React.FC<Props> = (props) => {
  const { children, value, onChange, checked, disabled = false } = props;
  let classes = classnames('g-radio-wrapper', {
    checked,
    disabled,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked && onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <label className={classes}>
      <span className="g-radio">
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className="g-radio-inner"></span>
      </span>
      <span className="g-radio-tips">{children}</span>
    </label>
  );
};

export default Radio;
