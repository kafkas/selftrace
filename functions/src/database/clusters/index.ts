import { usersCollection } from '..';
import { Region, Cluster } from '../../data-types';

/**
 * The main clustering algorithm will reside here.
 */
export async function retrieveClustersInRegion(
  region: Region
): Promise<Cluster[]> {
  //   const responseBody: Cluster[] = [
  //     { size: 4, location: { lat: 37.9838, lng: 23.7275 } },
  //     { size: 6, location: { lat: 39.9838, lng: 28.7275 } },
  //     { size: 1, location: { lat: 29.9838, lng: 18.7275 } },
  //     { size: 2, location: { lat: 45.9838, lng: 32.7275 } },
  //     { size: 5, location: { lat: 59.9838, lng: 67.7275 } },
  //   ];

  usersCollection().where('');
}
