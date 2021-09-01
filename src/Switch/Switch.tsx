import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import './Switch.scss';

interface Props {
  /**
   * 可以这样写属性描述
   * @description     Switch的类名
   */
  className?: string;
  /**
   * 可以这样写属性描述
   * @description     Switch的CSS样式
   */
  style?: React.CSSProperties;
  /**
   * 可以这样写属性描述
   * @description     Switch的选中值
   */
  value: boolean;
  /**
   * 可以这样写属性描述
   * @description     checked改变时的回调函数
   */
  onChange: (value: boolean) => void;
  /**
   * 可以这样写属性描述
   * @description     是否禁用
   * @default         false
   */
  disabled?: boolean;
  /**
   * 可以这样写属性描述
   * @description     是否处于加载中
   * @default         false
   */
  loading?: boolean;
}

const Switch: React.FC<Props> = (props) => {
  const { className, style, disabled, value, onChange, loading } = props;
  const classNames = classnames('g-switch', className, {
    'g-switch-checked': value,
    disabled: disabled,
  });
  const handleClick = () => {
    if (disabled) return;
    onChange(!value);
  };
  return (
    <div className={classNames} style={style} onClick={handleClick}>
      <div className="g-switch-toggle-wrapper">
        <div className="g-switch-toggle">
          {loading && <span className="g-loadingIndicator" />}
        </div>
      </div>
    </div>
  );
};

Switch.defaultProps = {
  loading: false,
  disabled: false,
};

export default Switch;
