import React from 'react';
import { View } from 'react-native';
import MapView, { MapViewProps, Marker } from 'react-native-maps';
import Text from '../Text';
import { Cluster } from '../../data-types';

export interface CoronaMapProps extends MapViewProps {
  clusters: Cluster[];
}

export default function CoronaMap({ clusters, ...rest }: CoronaMapProps) {
  return (
    <MapView provider='google' {...rest}>
      {clusters.map((cluster, idx) => {
        const {
          size,
          location: { lat, lng },
        } = cluster;
        return (
          <Marker
            // key={`${lat}-${lng}`}
            key={idx.toString()}
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            tracksViewChanges={false}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                backgroundColor: 'purple',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>{size}</Text>
            </View>
          </Marker>
        );
      })}
    </MapView>
  );
}
