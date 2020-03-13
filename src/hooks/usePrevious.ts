import { useRef, useEffect } from 'react';

// A hook that stores previous value
export function usePrevious<T>(value: T): T {
  const ref = useRef();

  useEffect((): void => {
    ref.current = value;
  }, [value]);

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
