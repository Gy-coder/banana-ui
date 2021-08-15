import React from 'react';
import './Tree.scss';
import TreeItem from '@/Tree/TreeItem';

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

export type TreeProps = {
  sourceData: Array<sourceDataItem>;
} & (A | B);

const Tree: React.FC<TreeProps> = (props) => {
  const { sourceData, selected, onChange, multiple } = props;
  return (
    <div className="g-tree">
      {sourceData.map((item, index) => {
        return <TreeItem treeProps={props} item={item} level={1} key={index} />;
      })}
    </div>
  );
};

export default Tree;
