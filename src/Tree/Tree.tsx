import React from 'react';
import classnames from 'classnames';
import './Tree.scss';

export interface sourceDataItem {
  text: string;
  value: string;
  children: sourceDataItem[];
  onChange: (item: sourceDataItem, bool: boolean) => void;
}

type A = {
  selected: Array<string>;
  mutiple: true;
};

type B = {
  selected: string;
  mutiple: false;
};

type Props = {
  sourceData: Array<sourceDataItem>;
  onChange: (item: sourceDataItem, bool: boolean) => void;
} & (A | B);

const renderItem = (
  item: sourceDataItem,
  selected: string[] | string,
  onChange: (item: sourceDataItem, bool: boolean) => void,
  level = 1,
) => {
  const classes = classnames('g-tree-item', {
    [`level-${level}`]: level,
  });
  return (
    <div key={item.value} className={classes}>
      <div className="g-tree-item-text">
        <input
          type="checkbox"
          checked={selected.includes(item.value)}
          onChange={(e) => onChange(item, e.target.checked)}
        />
        {item.text}
      </div>
      {item.children?.map((sub) => {
        return renderItem(sub, selected, onChange, level + 1);
      })}
    </div>
  );
};

const Tree: React.FC<Props> = (props) => {
  const { sourceData, selected, onChange, mutiple } = props;
  if (mutiple === true) {
    return (
      <div className="g-tree">
        {sourceData.map((item) => {
          return renderItem(item, selected, onChange);
        })}
      </div>
    );
  } else {
    return <div>未完成</div>;
  }
};

export default Tree;
