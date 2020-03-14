/*
 * Cloud Functions
 */

import * as functions from 'firebase-functions';
import * as Database from './database';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// });

/*
 * User
 */

export const processUserCreation = functions.auth
  .user()
  .onCreate(async user => {
    const { email, uid } = user;
    const safeEmail = email as string;
    try {
      await Promise.all([
        // Mailer.sendEmailToAdmin(`${safeEmail} has just signed up.`),
        // Mailer.sendWelcomeEmail(safeEmail),
        Database.setUserDoc(uid, {
          email: safeEmail,
        }),
      ]);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

export const processUserDeletion = functions.auth
  .user()
  .onDelete(async ({ uid }) => {
    try {
      // Delete user document and all nested data.
      await Database.deleteUserDoc(uid);
      // await Mailer.sendEmailToAdmin(
      //   `The account of ${email} has just been deleted.`
      // );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  });

/*
 * This is based on the Firestore document as it is not currently possible to react to
 * Firebase Authentication directly
 */

export const processUserUpdate = functions.firestore
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
