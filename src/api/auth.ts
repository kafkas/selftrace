import * as firebase from 'firebase';
import { User, Observer } from 'firebase/app';

/**
 * Request signup
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#create-user-with-email-and-password
 */
export const requestSignup = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

/**
 * Request signin
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#sign-inwith-email-and-password
 */
export const requestSignin = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

/**
 * Request signout
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#sign-out
 */
export const requestSignout = () => firebase.auth().signOut();

/**
 * Subscribe to auth state
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#on-auth-state-changed
 */
export const requestAuthStateListener = (successCallback: Observer<User>) =>
  firebase.auth().onAuthStateChanged(successCallback);

/**
 * Reset password
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#send-password-reset-email
 */
export const requestResetPassword = (email: string) =>
  firebase.auth().sendPasswordResetEmail(email);

/**
 * Update password
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.User.html#update-password
 */
export const requestUpdatePassword = (newPassword: string) => {
  const { currentUser } = firebase.auth();
  return currentUser
    ? currentUser.updatePassword(newPassword)
    : Promise.reject(new Error('User does not exist.'));
};
