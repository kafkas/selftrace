import axios from 'axios';
import { CLUSTERS_ENDPOINT, CLUSTERS_ENDPOINT_DEV } from './config';
import { ClusterObject, RegionObject } from '../data-types';

export async function requestClusters(region: RegionObject, devMode: boolean) {
  try {
    const res = await axios.post(
      devMode ? CLUSTERS_ENDPOINT_DEV : CLUSTERS_ENDPOINT,
      {
        region,
      }
    );
    const clusters = res.data as ClusterObject[]; // TODO: Fix later
    return Promise.resolve(clusters);
  } catch (err) {
    return Promise.reject(err);
  }
}
