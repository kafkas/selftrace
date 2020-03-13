import { SQLTransaction } from 'expo-sqlite/src/SQLite.types';
import { name, columns } from './config';

export const createKeysTable = (tx: SQLTransaction) => {
  tx.executeSql(
    `create table if not exists ${name} (${columns.id} text primary key not null, ${columns.integerValue} integer, ${columns.textValue} text)`,
    [],
    () => {},
    (t, err) => {
      throw new Error(
        `Could not create the '${name}' table. Reason:\n${err.message}`
      );
    }
  );
};

export const dropKeysTable = (tx: SQLTransaction) => {
  tx.executeSql(
    `drop table if exists ${name}`,
    [],
    () => {},
    (t, err): void => {
      throw new Error(
        `Could not drop the ${name} table. Reason:\n${err.message}`
      );
    }
  );
};
