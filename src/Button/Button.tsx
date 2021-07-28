import React from 'react';
import classnames from 'classnames';
import './Button.scss';

type ButtonTheme = 'button' | 'link' | 'text';

type ButtonSize = 'small' | 'normal' | 'big';

type ButtonLevel = 'main' | 'danger' | 'normal';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  theme?: ButtonTheme;
  size?: ButtonSize;
  level?: ButtonLevel;
  disabled?: boolean;
  loading?: Boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    theme = 'button',
    size = 'normal',
    level = 'normal',
    disabled = false,
    loading = false,
    ...rest
  } = props;
  const classes = classnames('g-button', className, {
    [`g-theme-${theme}`]: theme,
    [`g-size-${size}`]: size,
    [`g-level-${level}`]: level,
  });
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {loading && <span className="g-loadingIndicator" />}
      {children}
    </button>
  );
};

export default Button;
