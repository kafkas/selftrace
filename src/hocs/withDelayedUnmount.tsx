import React, { useEffect, ReactElement, useState } from 'react';

interface WithDelayedUnmountProps {
  isVisible: boolean;
  duration: number;
}

const withDelayedUnmount = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithDelayedUnmountProps> => ({
  isVisible,
  duration,
  ...rest
}: WithDelayedUnmountProps): ReactElement => {
  const [isMounted, setIsMounted] = useState(isVisible);
  useEffect(() => {
    if (isVisible) setIsMounted(true);
    else
      setTimeout(() => {
        setIsMounted(false);
      }, duration);
  }, [duration, isVisible]);
  return isMounted ? <Component {...(rest as P)} /> : null;
};

export default withDelayedUnmount;
