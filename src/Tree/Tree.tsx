import React, { ChangeEventHandler, useState } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown} from 'react-icons/ai';
import './Tree.scss';

export interface sourceDataItem {
  text: string;
  value: string;
  children: sourceDataItem[];
}

type A = {
  selected: Array<string>;
  multiple: true;
  onChange: (newSelected: Array<string>) => void;
};

type B = {
  selected: string;
  multiple?: false;
  onChange: (newSelected: string) => void;
};

type Props = {
  sourceData: Array<sourceDataItem>;
} & (A | B);

const Tree: React.FC<Props> = (props) => {
  const { sourceData, selected, onChange, multiple } = props;
  const renderItem = (item: sourceDataItem, level = 1) => {
    const [expended, setExpended] = useState(true);
    const classes = classnames('g-tree-item', {
      [`level-${level}`]: level,
    });
    const checked = multiple
      ? selected.includes(item.value)
      : selected === item.value;
    const change: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (multiple) {
        if (e.target.checked) {
          // @ts-ignore
          onChange([...selected, item.value]);
        } else {
          // @ts-ignore
          onChange(selected.filter((value: string) => value !== item.value));
        }
      } else {
        // @ts-ignore
        onChange(item.value);
      }
    };
    const handleExpend = () => {
      setExpended(!expended);
    };
    return (
      <div key={item.value} className={classes}>
        <div className="g-tree-item-text">
          <span
            className={classnames('icon', { collapsed: !expended })}
            onClick={handleExpend}
          >
            {item.children && <AiFillCaretDown />}
          </span>
          <input type="checkbox" checked={checked} onChange={change} />
          {item.text}
        </div>
        <div
          className={classnames('g-tree-children', { collapsed: !expended })}
        >
          {item.children?.map((sub) => {
            return renderItem(sub, level + 1);
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="g-tree">
      {sourceData.map((item) => {
        return renderItem(item);
      })}
    </div>
  );
};

export default Tree;
