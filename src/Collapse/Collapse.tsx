import React from 'react';
import './Collapse.scss';
import { CollapseItemProps } from '@/Collapse/types';

interface Props {
  selected: Array<string>;
  onChange: (newSelected: Array<string>) => void;
  multiple?: boolean;
}

const Collapse: React.FC<Props> = (props) => {
  const { selected, children, onChange, multiple = true } = props;
  const handleChange = (name: string) => {
    let selectedCopy = JSON.parse(JSON.stringify(selected));
    if (multiple === false) {
      if (selectedCopy.indexOf(name) >= 0) {
        selectedCopy = [];
      } else {
        selectedCopy = [name];
      }
    } else {
      if (selectedCopy.indexOf(name) >= 0) {
        let i = selectedCopy.indexOf(name);
        selectedCopy.splice(i, 1);
      } else {
        selectedCopy.push(name);
      }
    }
    onChange(selectedCopy);
  };
  const render = () => {
    return React.Children.map(children, (child) => {
      const childElement =
        child as React.FunctionComponentElement<CollapseItemProps>;
      return React.cloneElement(childElement, {
        selected,
        title: childElement.props.title,
        name: childElement.props.name,
        change: (name: string) => handleChange(name),
      });
    });
  };
  return <div className="g-collapse">{render()}</div>;
};

export default Collapse;
