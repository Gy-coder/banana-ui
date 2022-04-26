import { useMemo } from 'react';
import { TransferProps } from './Transfer';

export function useComputedData(props: TransferProps) {
  const propsKey = useMemo(
    () => props.props && props.props.key,
    [props.props!.key],
  );
  const data = useMemo(() => {
    return props.data.reduce((memo, cur) => {
      //@ts-ignore
      memo[cur[propsKey]] = cur;
      return memo;
    }, {});
  }, [props, props.data]);
  const sourceData = useMemo(() => {
    return props.data.filter(
      //@ts-ignore
      (item) => !props.modelValue.includes(item[propsKey as string]),
    );
  }, [props.data, props.modelValue]);
  const targetData = useMemo(() => {
    return props.modelValue.reduce((memo, key) => {
      //@ts-ignore
      memo.push(data[key]);
      return memo;
    }, []);
  }, [props.data, props.modelValue]);
  return { propsKey, sourceData, targetData };
}
