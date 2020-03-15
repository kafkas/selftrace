import React from 'react';
import { View } from 'react-native';
import * as API from '../../api';
import MapView from '../../components/MapView';
import { W_WIDTH } from '../../styles';

const testRegion = {
  latitude: 75.51279,
  longitude: 10.09184,
  latitudeDelta: 80,
  longitudeDelta: 80,
};

function MapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        region={testRegion}
        style={{ flex: 1, width: W_WIDTH }}
        onRegionChangeComplete={async region => {
          try {
            const clusters = await API.requestClusters();
            console.log('clusters = ', clusters);
          } catch (err) {
            // console.log('onRegionChange COMPLETE = ', region);
          }
        }}
      />
    </View>
  );
}

export default MapScreen;
