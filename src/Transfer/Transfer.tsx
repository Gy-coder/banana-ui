import React, { Children, FC, useEffect, useMemo, useState } from 'react';
import TransferPanel from './TransferPanel';
import { useComputedData } from './useComputedData';
import './Transfer.scss';
import Button from '../Button/Button';

export type Key = string | number;
export type DataItem = {
  key: Key;
  label: string;
  disabled: boolean;
};

export type Props = {
  key: string;
  label: string;
  disabled: string;
};

export interface TransferProps {
  data: DataItem[]; // all data
  modelValue: Key[]; // right part's key
  onChangeModelValue: (modelValue: Key[]) => void;
  props?: Props; // other name of data
}

const Transfer: FC<TransferProps> = (props) => {
  const { targetData, sourceData } = useComputedData(props);
  const [checkedState, setCheckedState] = useState<{
    sourceChecked: Array<Key>;
    targetChecked: Array<Key>;
  }>({
    sourceChecked: [],
    targetChecked: [],
  });
  const addToSource = () => {
    const currentValue = [...props.modelValue];
    checkedState.targetChecked.forEach((item) => {
      const idx = currentValue.indexOf(item);
      if (idx >= 0) {
        currentValue.splice(idx, 1);
      }
    });
    props.onChangeModelValue(currentValue);
  };
  const addToTarget = () => {
    const currentValue = [...props.modelValue];
    props.onChangeModelValue([...currentValue, ...checkedState.sourceChecked]);
  };
  const onSourceChange = (sourceChecked: any) => {
    checkedState.sourceChecked = [...sourceChecked];
    setCheckedState({ ...checkedState });
  };
  const onTargetChange = (targetChecked: any) => {
    checkedState.targetChecked = [...targetChecked];
    setCheckedState({ ...checkedState });
  };
  const toTargetDisabled = useMemo(() => {
    return checkedState.targetChecked.length === 0;
  }, [checkedState.targetChecked]);
  const toSourceDisabled = useMemo(() => {
    return checkedState.sourceChecked.length === 0;
  }, [checkedState.sourceChecked]);
  return (
    <div className="g-transfer">
      <TransferPanel
        data={sourceData}
        props={props.props as Props}
        onCheckedChange={onSourceChange}
        type="source"
      />
      <div className="g-transfer-buttons">
        <Button disabled={toTargetDisabled} onClick={addToSource}>
          &lt;
        </Button>
        <Button disabled={toSourceDisabled} onClick={addToTarget}>
          &gt;
        </Button>
      </div>
      <TransferPanel
        data={targetData}
        props={props.props as Props}
        onCheckedChange={onTargetChange}
        type="target"
      />
    </div>
  );
};

Transfer.defaultProps = {
  props: {
    key: 'key',
    label: 'label',
    disabled: 'disabled',
  },
};

export default Transfer;
