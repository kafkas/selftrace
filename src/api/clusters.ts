import axios from 'axios';
import { CLUSTERS_ENDPOINT } from './config';
import { Cluster } from '../data-types';

export async function requestClusters(region: Region) {
  try {
    const res = await axios.post(CLUSTERS_ENDPOINT, {
      region,
    });
    const clusters = res.data as Cluster[];
    return Promise.resolve(clusters);
  } catch (err) {
    return Promise.reject(err);
  }
}
