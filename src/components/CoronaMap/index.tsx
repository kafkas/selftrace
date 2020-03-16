import React from 'react';
import MapView, { MapViewProps } from 'react-native-maps';
import ClusterMarker from './ClusterMarker';

import { ClusterObject, AnonymListItem } from '../../data-types';

export interface CoronaMapProps extends MapViewProps {
  clusters: AnonymListItem<ClusterObject>[];
}

export default function CoronaMap({ clusters, ...rest }: CoronaMapProps) {
  return (
    <MapView provider='google' {...rest}>
      {clusters.map(({ data: cluster, key }) => {
        return <ClusterMarker key={key} cluster={cluster} />;
      })}
    </MapView>
  );
}
