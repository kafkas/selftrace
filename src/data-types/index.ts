import { LatLng, Region } from 'react-native-maps';

export type Location = LatLng;

export { Region };

export interface Cluster {
  size: number;
  location: {
    lat: number;
    lng: number;
  };
}

export * from './AuthStatus';
export * from './Progress';
export * from './Wellbeing';
