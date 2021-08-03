import React from 'react';
import classnames from 'classnames';
import './Tree.scss';

interface sourceDataItem {
  text: string;
  value: string;
  children: sourceDataItem[];
}

interface Props {
  sourceData: Array<sourceDataItem>;
  selected: Array<string>;
}

const renderItem = (
  item: sourceDataItem,
  selectedValues: string[],
  level = 1,
) => {
  const classes = classnames('g-tree-item', {
    [`level-${level}`]: level,
  });
  return (
    <div key={item.value} className={classes}>
      <div className="g-tree-item-text">
        <input type="checkbox" checked={selectedValues.includes(item.value)} />
        {item.text}
      </div>
      {item.children?.map((sub) => {
        return renderItem(sub, selectedValues, level + 1);
      })}
    </div>
  );
};

const Tree: React.FC<Props> = (props) => {
  const { sourceData, selected } = props;
  return (
    <div className="g-tree">
      {sourceData.map((item) => {
        return renderItem(item, selected);
      })}
    </div>
  );
};

export default Tree;
