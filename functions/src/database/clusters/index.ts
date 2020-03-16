import { usersCollection } from '..';
import { Region, RegionObject, Cluster, ClusterObject } from '../../data-types';
import { UserDoc } from '../users';
// import { usersPositiveOrShowingSymptomsInRegionMOCK } from './mock';

async function usersPositiveOrShowingSymptomsInRegion(region: Region) {
  try {
    const sickUsersSnapshot = await usersCollection()
      .where('wellbeing', 'in', [2, 4])
      .get();
    const sickUsersInRegion = sickUsersSnapshot.docs.filter(snap => {
      const userDoc = snap.data() as UserDoc;
      const { lat, lng } = userDoc.lastLocation!;
      return region.contains(lat, lng);
    });

    return Promise.resolve(sickUsersInRegion);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * The main clustering algorithm.
 */
export async function queryForClustersInRegion(
  regionObj: RegionObject
): Promise<ClusterObject[]> {
  const region = new Region(
    regionObj.latitude,
    regionObj.longitude,
    regionObj.latitudeDelta,
    regionObj.longitudeDelta
  );
  try {
    const filteredUsers = await usersPositiveOrShowingSymptomsInRegion(region);

    // Divide into sub-regions. Consider it a virtual matrix of regions
    const subregions = region.getSubregions(10, 8);

    // For each sub-region we create a Cluster object
    const clusters = subregions.map(() => new Cluster());

    // Iterate through sick users and put into correct cluster
    filteredUsers.forEach(snapshot => {
      const data = snapshot.data() as UserDoc;
      const { lat, lng } = data.lastLocation!;
      const wellbeing = data.wellbeing!;

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
  } catch (err) {
    return Promise.reject(err);
  }
}
