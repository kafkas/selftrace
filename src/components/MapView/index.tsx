import React from 'react';
import RNMapView, { MapViewProps } from 'react-native-maps';

interface Props extends MapViewProps {}

function MapView(props: Props) {
  return <RNMapView provider='google' {...props} />;
}

export default MapView;
