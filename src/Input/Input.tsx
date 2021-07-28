import React from 'react';
import classnames from 'classnames';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { className, readOnly, disabled, error, ...rest } = props;
  const classes = classnames('g-input', className, {
    error,
  });
  return (
    <div className="g-input-wrapper">
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

export default Input;
