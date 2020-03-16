import * as admin from 'firebase-admin';

admin.initializeApp();

export const { FieldPath } = admin.firestore;

export const database = () => admin.firestore();

export const auth = () => admin.auth();

export * from './users';
export * from './clusters';
