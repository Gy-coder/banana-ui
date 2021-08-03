import React from 'react';
import classnames from 'classnames';
import './Tree.scss';

export interface sourceDataItem {
  text: string;
  value: string;
  children: sourceDataItem[];
  onChange: (item: sourceDataItem, bool: boolean) => void;
}

interface Props {
  sourceData: Array<sourceDataItem>;
  selected: Array<string>;
  onChange: (item: sourceDataItem, bool: boolean) => void;
}

const renderItem = (
  item: sourceDataItem,
  selectedValues: string[],
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
          checked={selectedValues.includes(item.value)}
          onChange={(e) => onChange(item, e.target.checked)}
        />
        {item.text}
      </div>
      {item.children?.map((sub) => {
        return renderItem(sub, selectedValues, onChange, level + 1);
      })}
    </div>
  );
};

const Tree: React.FC<Props> = (props) => {
  const { sourceData, selected, onChange } = props;
  return (
    <div className="g-tree">
      {sourceData.map((item) => {
        return renderItem(item, selected, onChange);
      })}
    </div>
  );
};

export default Tree;
