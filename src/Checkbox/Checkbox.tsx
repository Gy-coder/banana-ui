import React from 'react';
import classnames from 'classnames';
import './Checkbox.scss';

export interface Props {
  checked: boolean;
  value: string;
  onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<Props> = (props) => {
  const { children, value, checked, onChange, disabled = false } = props;
  const handleChange = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(value, e);
  };
  const classes = classnames('g-checkbox-wrapper', {
    disabled,
    checked,
  });
  return (
    <label className={classes}>
      <span className="g-checkbox">
        <span className="g-checkbox-inner"></span>
        <input
          type="checkbox"
          value={value}
          onChange={(e) => handleChange(value, e)}
          checked={checked}
          disabled={disabled}
        />
      </span>
      <span className="g-checkbox-tips">{children}</span>
    </label>
  );
};

export default Checkbox;
