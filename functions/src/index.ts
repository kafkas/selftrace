/*
 * Cloud Functions
 */

import * as functions from 'firebase-functions';
import * as Database from './database';

/*
 * 1. User
 */

/**
 * Reacts to user creation.
 */
exports.processUserCreation = functions.auth.user().onCreate(async user => {
  const { email, uid } = user;
  const safeEmail = email as string;
  try {
    await Promise.all([
      Database.setUserDoc(uid, {
        email: safeEmail,
      }),
    ]);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
});

/**
 * Reacts to user deletion.
 */
exports.processUserDeletion = functions.auth
  .user()
  .onDelete(async ({ uid }) => {
    try {
      // Delete user document and all nested data.
      await Database.deleteUserDoc(uid);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

/**
 * Reacts to user update. This is based on the Firestore document as it is not
 * currently possible to react to Firebase Authentication directly.
 */
exports.processUserUpdate = functions.firestore
  .document('users/{userID}')
  .onUpdate(async ({ before, after }) => {
    const uid = after.id;
    const userDocBefore = before.data() as Database.UserDoc;
    const userDocAfter = after.data() as Database.UserDoc;

    try {
      // Update Firebase Auth email so it is consistent with Firestore
      if (userDocBefore.email !== userDocAfter.email) {
        await Database.auth().updateUser(uid, { email: userDocAfter.email });
      }

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

/*
 * 2. HTTPS Requests
 */

interface Cluster {
  size: number;
  location: {
    lat: number;
    lng: number;
  };
}

/**
 * Clusters endpoint
 */
exports.processClusterRequest = functions.https.onRequest(
  (request, response) => {
    if (request.method !== 'POST') {
      response.status(400).send('This endpoint accepts only POST requests.');
      return;
    }

    const data = request.body;
    console.log('DATA WE RECEIVED BELOW');
    console.log(data);

    const responseBody: Cluster[] = [
      { size: 4, location: { lat: 37.9838, lng: 23.7275 } },
      { size: 6, location: { lat: 39.9838, lng: 28.7275 } },
      { size: 1, location: { lat: 29.9838, lng: 18.7275 } },
      { size: 2, location: { lat: 45.9838, lng: 32.7275 } },
      { size: 5, location: { lat: 59.9838, lng: 67.7275 } },
    ];

    response.status(200).send(responseBody);
  }
);
