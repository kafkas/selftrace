import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import Text from '../Text';
import { ClusterObject } from '../../data-types';
import { CLUSTER_BASE_COLOR } from '../../styles/colors';

const BASE_DIAMETER = 30;

// BASE_DIAMETER + MAX_DELTA will be maximum marker diameter (size)
const MAX_DELTA = 20;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: 'white',
  },
});

interface Props {
  cluster: ClusterObject;
}

export default function ClusterMarker({ cluster }: Props) {
  const { lat, lng, positiveCount, showingSymptomsCount } = cluster;
  const size = positiveCount + showingSymptomsCount;

  const perc = Math.min(1, (0.9 * (size - 1)) / size);
  const diameter = BASE_DIAMETER + perc * MAX_DELTA;
  const backgroundColor = CLUSTER_BASE_COLOR.lighten(-perc * 15);

  return (
    <Marker
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
      tracksViewChanges={false}
    >
      <View
        style={[
          styles.container,
          {
            height: diameter,
            width: diameter,
            borderRadius: diameter / 2,
            backgroundColor,
          },
        ]}
      >
        <Text style={styles.number}>{size}</Text>
      </View>
    </Marker>
  );
}
