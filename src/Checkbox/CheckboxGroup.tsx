import React from 'react';
import classnames from 'classnames';
//@ts-ignore
import Checkbox, { Props as CheckboxProps } from './Checkbox';

interface Props {
  values: string[];
  onChange: (values: string[]) => void;
  disabled: boolean;
}

const CheckboxGroup: React.FC<Props> = (props) => {
  const { disabled, onChange, values, children } = props;
  const classes = classnames('g-checkbox-group', {
    disabled,
  });
  const handleChange = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let valuesCopy = JSON.parse(JSON.stringify(values));
    if (!e.target.checked) {
      let index = values.indexOf(value);
      valuesCopy.splice(index, 1);
    } else {
      valuesCopy.push(value);
    }
    onChange(valuesCopy);
  };
  const render = () => {
    return React.Children.map(children, (child) => {
      const childElement =
        child as React.FunctionComponentElement<CheckboxProps>;
      if (childElement.type !== Checkbox) {
        throw new Error('CheckboxGroup的子元素必须是Checkbox');
      }
      return React.cloneElement(childElement, {
        checked: values.indexOf(childElement.props.value) >= 0,
        onChange: handleChange,
        disabled: childElement.props.disabled || disabled,
      });
    });
  };
  return <div className={classes}>{render()}</div>;
};

export default CheckboxGroup;
