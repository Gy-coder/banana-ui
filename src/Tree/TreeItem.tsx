import React, { ChangeEventHandler, useState } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown } from 'react-icons/ai';
import { sourceDataItem, TreeProps } from '@/Tree/Tree';

interface Props {
  item: sourceDataItem;
  level: number;
  treeProps: TreeProps
};

const TreeItem: React.FC<Props> = (props) => {
  const { item, level, treeProps} = props;
  const [expended, setExpended] = useState(true);
  const classes = classnames('g-tree-item', {
    [`level-${level}`]: level,
  });
  const checked = treeProps.multiple
    ? treeProps.selected.includes(item.value)
    : treeProps.selected === item.value;
  const change: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (treeProps.multiple) {
      if (e.target.checked) {
        // @ts-ignore
        treeProps.onChange([...treeProps.selected, item.value]);
      } else {
        treeProps.onChange(treeProps.selected.filter((value: string) => value !== item.value));
      }
    } else {
      if(e.target.checked){
        treeProps.onChange(item.value);
      }else{
        treeProps.onChange('')
      }
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
      <div className={classnames('g-tree-children', { collapsed: !expended })}>
        {item.children?.map((sub,index) => {
          return <TreeItem item={sub} treeProps={treeProps} level={level + 1} key={index}/>
        })}
      </div>
    </div>
  );
};

export default TreeItem;
