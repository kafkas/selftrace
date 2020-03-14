import { db } from './helpers';
import { createKeysTable, dropKeysTable } from './keys/helpers';

/*
 * Each table is in its own folder. All helper files are private
 * (i.e. outside the public interface of the Database API).
 */

export function initialize() {
  db.transaction((tx): void => {
    createKeysTable(tx);
  });
}

export function clear() {
  db.transaction((tx): void => {
    dropKeysTable(tx);
  });
}

export * from './abstract';
export * from './keys';
