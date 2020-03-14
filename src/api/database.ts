import * as firebase from 'firebase';
import 'firebase/firestore';

const database = () => firebase.firestore();

const usersCollection = () => database().collection('users');

export const userDoc = (uid: string) => usersCollection().doc(uid);

/** The shape of each user document stored in Firestore */
export interface FirestoreUserDoc {
  email: string;
  lastLocation: {
    lat: number;
    lng: number;
  };
  wellbeing: number;
}

/** Get user details. */
export async function requestUserInfo(uid: string) {
  try {
    const snapshot = await userDoc(uid).get();
    return snapshot.data() as FirestoreUserDoc | undefined;
  } catch (err) {
    return Promise.reject(err);
  }
}

/** Update user details. */
export function requestUpdateUserInfo(
  uid: string,
  details: Partial<FirestoreUserDoc>
) {
  return userDoc(uid).update(details);
}
