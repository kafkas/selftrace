import React, { useState } from 'react';
import { View } from 'react-native';
import * as API from '../../api';
import CoronaMap from '../../components/CoronaMap';
import ReactUtils from '../../util/ReactUtils';
import { ClusterObject, RegionObject, AnonymListItem } from '../../data-types';
import styles from './styles';

interface State {
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
}

function MapScreen() {
  const [state, setState] = useState<State>({ clusters: [], isLoading: false });

  async function handleRegionChange(regionObj: RegionObject) {
    setState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const receivedClusters = await API.requestClusters(regionObj);
      setState({
        clusters: receivedClusters.map(cluster => ({
          key: ReactUtils.generateListKey(),
          data: cluster,
        })),
        isLoading: false,
      });
    } catch (err) {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }

  return (
    <View style={styles.container}>
      <CoronaMap
        clusters={state.clusters}
        onRegionChangeComplete={handleRegionChange}
        style={styles.mapContainer}
      />
    </View>
  );
}

export default MapScreen;
