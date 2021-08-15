import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown } from 'react-icons/ai';
import { sourceDataItem, TreeProps } from '@/Tree/Tree';
import { useDidMountEffect } from '@/hooks/useDidMountEffect';
import { useFlat } from '@/hooks/useFlat';
import { useIntersection } from '@/hooks/useIntersection';

interface Props {
  item: sourceDataItem;
  level: number;
  treeProps: TreeProps;
  onItemChange: (value: string[])=>void
}

const TreeItem: React.FC<Props> = (props) => {
  const { item, level, treeProps } = props;
  const [expended, setExpended] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null)
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
  const collectChildrenValues = (item: sourceDataItem): string[]=>{
    return useFlat(item.children?.map(i=>[i.value,collectChildrenValues(i)]))
  }
  const change: ChangeEventHandler<HTMLInputElement> = (e) => {
    const childrenValues = collectChildrenValues(item)
    if (treeProps.multiple) {
      if (e.target.checked) {
        // @ts-ignore
        props.onItemChange([...treeProps.selected, item.value,...childrenValues]);
      } else {
        props.onItemChange(
          treeProps.selected.filter((value: string) => value !== item.value && childrenValues.indexOf(value) === -1),
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
  const onItemChange = (values:string[]) => {
    const childrenValues = collectChildrenValues(item)
    const common = useIntersection(values,childrenValues)
    if(common.length !== 0){
      props.onItemChange(Array.from(new Set(values.concat(item.value))))
      if(common.length === childrenValues.length){
        inputRef.current!.indeterminate = false
      }else{
        inputRef.current!.indeterminate = true
      }
    }else{
      props.onItemChange(values.filter(v=>v !== item.value))
      inputRef.current!.indeterminate = false
    }
  }
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
        <input ref={inputRef} type="checkbox" checked={checked} onChange={change} />
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
              onItemChange={onItemChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TreeItem;
