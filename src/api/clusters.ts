import axios from 'axios';
import { CLUSTERS_ENDPOINT } from './config';

interface Cluster {
  size: number;
  location: {
    lat: number;
    lng: number;
  };
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export async function requestClusters(region: Region) {
  try {
    const res = await axios.post(CLUSTERS_ENDPOINT, {
      region,
    });
    console.log('RESPONSE = ', res);
    return Promise.resolve(res);
  } catch (err) {
    console.log('ERROR = ', err);
    return Promise.reject(err);
  }
}
