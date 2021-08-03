import React, { useState } from 'react';
import classnames from 'classnames';
import Radio, { Props as RadioProps } from './Radio';
import './Radio.scss';

interface Props {
  /**
   * @description Group选中的value值
   */
  value: any;
  /**
   * @description value值改变时的回调函数
   */
  onChange: (value: any) => void;
  /**
   * @description 是否禁用所有的子Radio
   */
  disabled?: false;
}

const RadioGroup: React.FC<Props> = (props) => {
  const { value, onChange, children, disabled = false } = props;
  const classes = classnames('g-radio-group');
  const render = () => {
    return React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<RadioProps>;
      if (childElement.type !== Radio) {
        throw new Error('RadioGroup的子元素必须是Radio');
      }
      return React.cloneElement(childElement, {
        checked: value === childElement.props.value,
        onChange,
        disabled: childElement.props.disabled || disabled,
      });
    });
  };
  return <div className={classes}>{render()}</div>;
};

export default RadioGroup;
