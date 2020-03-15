import { FirestoreUserDoc } from '../../api';
import MathUtils from '../../util/MathUtils';

// TODO: Move after setting up Jest
export function createRandomUsers(count: number): FirestoreUserDoc[] {
  const users = new Array<FirestoreUserDoc>(count);
  for (let i = 0; i < count; i++) {
    users[i] = {
      lastLocation: {
        lat: MathUtils.generateRandomInt(-89, 89),
        lng: MathUtils.generateRandomInt(-179, 179),
      },
    };
  }

  return users;
}
