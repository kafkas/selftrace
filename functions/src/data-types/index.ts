export interface ClusterObject {
  lat: number;
  lng: number;
  positiveCount: number;
  showingSymptomsCount: number;
}

export interface RegionObject {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export * from './Cluster';
export * from './Region';
