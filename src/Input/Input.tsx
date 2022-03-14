import React from 'react';
import classnames from 'classnames';
import './Input.scss';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * @description 错误时显示的文字
   */
  error?: string;
  /**
   * @description 是否是block元素
   */
  block?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const { className, readOnly, disabled, block, error, ...rest } = props;
  const classes = classnames('g-input', className, {
    error,
  });
  return (
    <div
      className={classnames('g-input-wrapper', {
        block,
      })}
    >
      <input
        className={classes}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />
      {error && (
        <>
          <span className="error-message">{error}</span>
        </>
      )}
    </div>
  );
};

Input.defaultProps = {
  block: false,
};

export default Input;
