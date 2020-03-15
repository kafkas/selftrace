import React, { useState } from 'react';
import { View } from 'react-native';
import * as API from '../../api';
import CoronaMap from '../../components/CoronaMap';
import { Cluster, Region } from '../../data-types';
import styles from './styles';

interface State {
  clusters: Cluster[];
  isLoading: boolean;
}

function MapScreen() {
  const [state, setState] = useState<State>({ clusters: [], isLoading: false });

  async function handleRegionChange(region: Region) {
    setState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const receivedClusters = await API.requestClusters(region);
      setState({ clusters: receivedClusters, isLoading: false });
    } catch (err) {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }

  return (
    <View style={styles.container}>
      <CoronaMap
        clusters={state.clusters}
        // onRegionChangeComplete={handleRegionChange}
        style={styles.mapContainer}
      />
    </View>
  );
}

export default MapScreen;
