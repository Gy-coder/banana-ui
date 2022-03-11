import React from 'react';
import Button, { ButtonProps } from './Button';
import './ButtonGroup.scss';

const ButtonGroup: React.FC = (props) => {
  const { children } = props;
  React.Children.map(children, (child) => {
    const childElement = child as React.FunctionComponentElement<ButtonProps>;
    if (childElement.type !== Button) {
      throw new Error('CheckboxGroup的子元素必须是Checkbox');
    }
  });
  return <div className="g-button-group">{children}</div>;
};

export default ButtonGroup;
