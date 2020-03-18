import { Region } from '../../data-types';
import MathUtils from '../../util/MathUtils';
import { UserDoc } from '../users';

function createRandomUsers(count: number): UserDoc[] {
  const users = new Array<UserDoc>(count);
  for (let i = 0; i < count; i++) {
    const wellbeing = Math.random() < 0.5 ? 2 : 4;
    users[i] = {
      lastLocation: {
        lat: MathUtils.generateRandomInt(-89, 89),
        lng: MathUtils.generateRandomInt(-179, 179),
      },
      wellbeing,
    };
  }
  return users;
}

export async function usersPositiveOrShowingSymptomsInRegionMOCK(
  region: Region
) {
  try {
    const randomlyCreatedUsers = createRandomUsers(100000); // Treat as DB
    const usersInRegion = randomlyCreatedUsers.filter(user => {
      const { lat, lng } = user.lastLocation!;
      return region.contains(lat, lng);
    });

    const results = usersInRegion.map(user => ({
      data: () => ({ ...user }),
    }));

    return results;
  } catch (err) {
    return Promise.reject(err);
  }
}
