import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker, Callout, CalloutSubview } from 'react-native-maps';
import i18n from 'i18n-js';
import Text from '../Text';
import { ClusterObject } from '../../data-types';
import { CLUSTER_BASE_COLOR } from '../../styles/colors';

const BASE_DIAMETER = 30;
// BASE_DIAMETER + MAX_DELTA will be maximum marker diameter (size)
const MAX_DELTA = 20;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: 'white',
  },
  callout: {
    padding: 5,
    minHeight: 40,
    minWidth: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutDescription: {
    fontSize: 12,
    color: 'black',
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
      <Callout style={styles.callout}>
        <CalloutSubview>
          {size === 1 ? (
            <Text style={styles.calloutDescription}>
              {positiveCount === 1
                ? i18n.t('screens.map.userTestedPositive')
                : i18n.t('screens.map.userShowingSymptoms')}
            </Text>
          ) : (
            <>
              <Text style={styles.calloutDescription}>
                {i18n.t('screens.map.testedPositive')}: {positiveCount}
              </Text>
              <Text style={styles.calloutDescription}>
                {i18n.t('screens.map.showingSymptoms')}: {showingSymptomsCount}
              </Text>
            </>
          )}
        </CalloutSubview>
      </Callout>
    </Marker>
  );
}
