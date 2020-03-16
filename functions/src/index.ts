/*
 * Cloud Functions
 */

import * as functions from 'firebase-functions';
import * as Database from './database';
import { RegionObject } from './data-types';

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

/**
 * Clusters endpoint
 */
exports.processClusterRequest = functions.https.onRequest(
  async (request, response) => {
    if (request.method !== 'POST') {
      response.status(400).send('This endpoint accepts only POST requests.');
      return;
    }
    const regionObj = request.body.region as RegionObject;
    try {
      const clusters = await Database.queryForClustersInRegion(regionObj);
      response.status(200).send(clusters);
      return;
    } catch (err) {
      response.status(400).send('Could not get clusters.');
    }
  }
);
