import { useEffect, useRef } from 'react';

function useDidMountEffect(
  fn: React.EffectCallback,
  deps: React.DependencyList | undefined,
) {
  const isFirst = useRef<boolean>(true);
  useEffect(() => {
    if (isFirst.current === true) {
      isFirst.current = false;
    } else {
      fn();
    }
  }, deps);
}

export { useDidMountEffect };
