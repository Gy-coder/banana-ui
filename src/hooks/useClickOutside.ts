import { RefObject, useLayoutEffect } from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useLayoutEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return;
      } else {
        handler(e);
      }
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}

export { useClickOutside };
