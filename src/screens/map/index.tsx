import React, { useState } from 'react';
import { View } from 'react-native';
// import * as API from '../../api';
import CoronaMap from '../../components/CoronaMap';
import {
  Cluster,
  ClusterObject,
  Region,
  RegionObject,
  AnonymListItem,
} from '../../data-types';
import ReactUtils from '../../util/ReactUtils';
import { createRandomUsers } from './tests';
import styles from './styles';

const SICK_USERS = createRandomUsers(500); // Treat as DB

function requestClustersInRegion(regionObject: RegionObject) {
  // Filters Uber what is
  //
  const region = new Region(
    regionObject.latitude,
    regionObject.longitude,
    regionObject.latitudeDelta,
    regionObject.longitudeDelta
  );
  const filteredSickUsers = SICK_USERS.filter(user =>
    region.contains(user.lastLocation.lat, user.lastLocation.lng)
  );

  // Compute borders
  const topLat = region.latitude + region.latitudeDelta;
  const bottomLat = region.latitude - region.latitudeDelta;
  const leftLng = region.longitude - region.longitudeDelta;
  const rightLng = region.longitude + region.longitudeDelta;

  // Divide into sub-regions
  // Consider it a virtual matrix of regions
  const rowCount = 10;
  const colCount = 8;
  const subRegionCount = rowCount * colCount;

  // Compute other info
  const srhh = region.latitudeDelta / rowCount;
  const subregionHeight = 2 * srhh;
  const srhw = region.longitudeDelta / colCount;
  const subregionWidth = 2 * srhw;

  // Create the sub-regions
  const subregions = new Array<Region>(subRegionCount);
  for (let i = 0; i < subregions.length; i++) {
    const centerLat =
      topLat - srhh - subregionHeight * Math.floor(i / colCount);
    const centerLng = leftLng + srhw + subregionWidth * (i % colCount);
    subregions[i] = new Region(centerLat, centerLng, srhh, srhw);
  }

  // For each sub-region we create a Cluster object
  const clusters = new Array<Cluster>(subRegionCount);
  for (let i = 0; i < clusters.length; i++) {
    clusters[i] = new Cluster();
  }

  // Iterate through sick users and put into correct cluster
  filteredSickUsers.forEach(user => {
    const {
      lastLocation: { lat, lng },
      wellbeing,
    } = user;

    let index = 0;
    for (let i = 0; i < subregions.length; i++) {
      if (subregions[i].contains(lat, lng)) {
        index = i;
        break;
      }
    }

    const cluster = clusters[index];
    cluster.add(lat, lng, wellbeing);
  });

  return clusters.filter(cluster => cluster.size() > 0);
}

interface State {
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
}

function MapScreen() {
  const [state, setState] = useState<State>({ clusters: [], isLoading: false });

  // async function handleRegionChange(region: RegionObject) {
  //   setState(prevState => ({ ...prevState, isLoading: true }));
  //   try {
  //     const receivedClusters = await API.requestClusters(region);
  //     setState({ clusters: receivedClusters, isLoading: false });
  //   } catch (err) {
  //     setState(prevState => ({ ...prevState, isLoading: false }));
  //   }
  // }

  function handleRegionChange(region: RegionObject) {
    const receivedClusters = requestClustersInRegion(region);

    const newClusters = receivedClusters.map(cluster => ({
      key: ReactUtils.generateListKey(),
      data: cluster,
    }));

    setState({
      clusters: newClusters,
      isLoading: false,
    });
  }

  return (
    <View style={styles.container}>
      <CoronaMap
        clusters={state.clusters}
        // onRegionChangeComplete={handleRegionChange}
        onRegionChangeComplete={handleRegionChange}
        style={styles.mapContainer}
      />
    </View>
  );
}

export default MapScreen;
