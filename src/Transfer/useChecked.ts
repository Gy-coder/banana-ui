import { useEffect, useMemo } from 'react';
import { Key } from './Transfer';
import { panelStateType, TransferPanelProps } from './TransferPanel';

export function useChecked(
  props: TransferPanelProps,
  panelState: panelStateType,
  setPanelState: Function,
) {
  const labelProps = useMemo(() => props.props.label, [props.props.label]);
  const disabledProps = useMemo(
    () => props.props.disabled,
    [props.props.disabled],
  );
  const keyProps = useMemo(() => props.props.key, [props.props.key]);
  const checkableData = useMemo(
    () => props.data.filter((item) => !item[disabledProps]),
    [props.data],
  );
  const handleCheckAll = (_: any, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      panelState.checked = checkableData.map((item) => item[keyProps]);
    } else {
      panelState.checked = [];
    }
    setPanelState({
      ...panelState,
    });
  };
  const handleCheck = (val: Array<Key>) => {
    panelState.checked = [...val];
    setPanelState({ ...panelState });
  };
  useEffect(() => {
    const checkableKeys = checkableData.map((item) => item[keyProps]);
    panelState.allChecked =
      checkableKeys.length > 0 &&
      checkableKeys.every((key) => panelState.checked.includes(key));
    setPanelState({ ...panelState });
  }, [panelState.checked]);
  useEffect(() => {
    panelState.checked = [];
    setPanelState({ ...panelState });
  }, [props.data]);
  return { keyProps, disabledProps, labelProps, handleCheckAll, handleCheck };
}
