import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown } from 'react-icons/ai';
import { sourceDataItem, TreeProps } from '@/Tree/Tree';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';

interface Props {
  item: sourceDataItem;
  level: number;
  treeProps: TreeProps;
}

const TreeItem: React.FC<Props> = (props) => {
  const { item, level, treeProps } = props;
  const [expended, setExpended] = useState(true);
  const classes = classnames('g-tree-item', {
    [`level-${level}`]: level,
  });
  const checked = treeProps.multiple
    ? treeProps.selected.includes(item.value)
    : treeProps.selected === item.value;
  const divRef = useRef<HTMLDivElement>(null);
  useDidMountEffect(() => {
    if (expended) {
      if (!divRef.current) return;
      divRef.current.style.height = 'auto';
      const { height } = divRef.current.getBoundingClientRect();
      divRef.current.style.height = '0px';
      divRef.current.getBoundingClientRect();
      divRef.current.style.height = height + 'px';
      const afterExpand = () => {
        if (!divRef.current) {
          return;
        }
        divRef.current.style.height = '';
        divRef.current.classList.add('present');
        divRef.current.removeEventListener('transitionend', afterExpand);
      };
      divRef.current.addEventListener('transitionend', afterExpand);
    } else {
      if (!divRef.current) return;
      const { height } = divRef.current?.getBoundingClientRect();
      divRef.current.style.height = height + 'px';
      divRef.current.getBoundingClientRect();
      divRef.current.style.height = '0px';
      const afterCollapse = () => {
        if (!divRef.current) {
          return;
        }
        divRef.current.style.height = '';
        divRef.current.classList.add('gone');
        divRef.current.removeEventListener('transitionend', afterCollapse);
      };
      divRef.current.addEventListener('transitionend', afterCollapse);
    }
  }, [expended]);
  const change: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (treeProps.multiple) {
      if (e.target.checked) {
        // @ts-ignore
        treeProps.onChange([...treeProps.selected, item.value]);
      } else {
        treeProps.onChange(
          treeProps.selected.filter((value: string) => value !== item.value),
        );
      }
    } else {
      if (e.target.checked) {
        treeProps.onChange(item.value);
      } else {
        treeProps.onChange('');
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
      <div
        ref={divRef}
        className={classnames('g-tree-children', { collapsed: !expended })}
      >
        {item.children?.map((sub, index) => {
          return (
            <TreeItem
              item={sub}
              treeProps={treeProps}
              level={level + 1}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TreeItem;
