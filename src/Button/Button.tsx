import React from 'react';
import classnames from 'classnames';
import './Button.scss';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /**
   * 可以这样写属性描述
   * @description     Button的类型
   * @default         button
   */
  theme?: 'button' | 'link' | 'text';
  /**
   * 可以这样写属性描述
   * @description      Button的大小
   * @default          normal
   */
  size?: 'small' | 'normal' | 'big';
  /**
   * 可以这样写属性描述
   * @description      Button的级别
   * @default          normal
   */
  level?: 'main' | 'danger' | 'normal';
  /**
   * 可以这样写属性描述
   * @description      是否禁用
   * @default          false
   */
  disabled?: boolean;
  /**
   * 可以这样写属性描述
   * @description      是否显示加载状态
   * @default          false
   */
  loading?: Boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    theme,
    size,
    level,
    disabled,
    loading,
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

Button.defaultProps = {
  theme: 'button',
  size: 'normal',
  level: 'normal',
  disabled: false,
  loading: false,
};

export default Button;
