import React, { FC, useEffect, useState } from 'react';
import { Key, Props } from './Transfer';
import { useChecked } from './useChecked';
import Checkbox from '../Checkbox/Checkbox';
import CheckboxGroup from '../Checkbox/CheckboxGroup';

export interface TransferPanelProps {
  data: any[];
  props: Props;
  onCheckedChange: (checked: Array<any>) => void;
  type: 'source' | 'target';
}

export interface panelStateType {
  checked: Key[];
  allChecked: boolean;
}

const TransferPanel: FC<TransferPanelProps> = (props) => {
  const [panelState, setPanelState] = useState<panelStateType>({
    checked: [],
    allChecked: false,
  });
  const { keyProps, disabledProps, labelProps, handleCheckAll, handleCheck } =
    useChecked(props, panelState, setPanelState);
  useEffect(() => {
    props.onCheckedChange(panelState.checked);
  }, [panelState.checked]);
  return (
    <div className="g-transfer-panel">
      <div className="g-transfer-panel-header">
        <Checkbox
          checked={panelState.allChecked}
          onChange={handleCheckAll}
          value="全选"
        >
          全选
        </Checkbox>
      </div>

      <div className="g-transfer-panel-body">
        <CheckboxGroup
          values={panelState.checked as string[]}
          onChange={handleCheck}
          disabled={false}
          vertical
        >
          {props.data.map((item) => {
            return (
              <Checkbox
                disabled={item[disabledProps]}
                value={item[keyProps]}
                onChange={() => {}}
                checked={panelState.checked.indexOf(item[keyProps]) >= 0}
                key={item[keyProps]}
              >
                {item[labelProps]}
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </div>
      <div className="g-transfer-panel-footer">{props.type}</div>
    </div>
  );
};

export default TransferPanel;
