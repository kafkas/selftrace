import { LatLng, Region } from 'react-native-maps';

export type Location = LatLng;
export type RegionObject = Region;

export interface ClusterObject {
  lat: number;
  lng: number;
  positiveCount: number;
  showingSymptomsCount: number;
}

export type AnonymListItem<T> = {
  key: string;
  data: T;
};

export * from './AuthStatus';
export * from './Cluster';
export * from './Progress';
export * from './Region';
export * from './Wellbeing';
