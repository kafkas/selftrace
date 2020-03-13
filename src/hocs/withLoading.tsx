import React, { ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';
import Color from '../styles/Color';
import { INACTIVE_ICON_COLOR } from '../styles/colors';

interface WithLoadingProps {
  loading?: boolean;
  activityIndicatorSize?: number;
  activityIndicatorColor?: Color;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => ({
  loading,
  activityIndicatorSize,
  activityIndicatorColor,
  ...props
}: WithLoadingProps): ReactElement =>
  loading ? (
    <ActivityIndicator
      size={activityIndicatorSize || 'small'}
      color={
        activityIndicatorColor.toString() || INACTIVE_ICON_COLOR.toString()
      }
    />
  ) : (
    <Component {...(props as P)} />
  );

export default withLoading;
