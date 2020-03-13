import { db, processRawResult } from '../helpers';
import { name, columns, ColumnsMap } from './config';

/* eslint-disable camelcase */

type LocalDBKeyID = 'lastProcessedEventNumber';
type LocalDBKeyType = 'integer' | 'text';

/**
 * The shape of the key objects going into the database.
 */
export interface LocalDBKeyDoc {
  id: LocalDBKeyID;
  integerValue?: number;
  textValue?: string;
}

/**
 * The (raw) shape of the key objects coming out of the database. Must be consistent
 * with column names.
 */
interface LocalDBRawKeyDoc {
  id: string;
  integer_value?: number;
  text_value?: string;
}

const field = (type: LocalDBKeyType): 'integerValue' | 'textValue' => {
  let f = 'textValue';
  if (type === 'integer') f = 'integerValue';
  return f;
};

/**
 * Creates a new row in keys table.
 * @param keyDoc The details of the new key.
 */
function createKey(keyDoc: LocalDBKeyDoc, type: LocalDBKeyType): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((tx): void => {
      tx.executeSql(
        `insert into ${name} values (?, ?, ?);`,
        [
          keyDoc.id,
          type === 'integer' ? keyDoc.integerValue : null,
          type === 'text' ? keyDoc.textValue : null,
        ],
        () => {
          resolve();
        },
        (t, err) => {
          reject(err);
        }
      );
    });
  });
}

/**
 * Updates an existing key record.
 * @param keyDoc The details of the key.
 */
function updateKey(keyDoc: LocalDBKeyDoc, type: LocalDBKeyType): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((tx): void => {
      tx.executeSql(
        `update ${name} set ${columns[field(type)]}=? where ${columns.id}=?;`,
        [keyDoc[field(type)], keyDoc.id],
        () => {
          resolve();
        },
        (t, err) => {
          reject(err);
        }
      );
    });
  });
}

export function getKey<ValueType>(
  id: LocalDBKeyID,
  type: LocalDBKeyType
): Promise<ValueType | undefined> {
  return new Promise((resolve, reject) => {
    db.transaction((tx): void => {
      tx.executeSql(
        `select ${columns[field(type)]} from ${name} where ${columns.id}=?;`,
        [id],
        (t, resultSet) => {
          const results = resultSet.rows._array as LocalDBRawKeyDoc[];
          if (results.length === 0) resolve(undefined);
          else {
            const [result] = results;
            const processed = processRawResult<
              LocalDBRawKeyDoc,
              LocalDBKeyDoc,
              ColumnsMap
            >(result, columns);
            resolve(processed[field(type)]);
          }
        },
        (t, err) => {
          reject(err);
        }
      );
    });
  });
}

export async function setKey<ValueType extends string | number>(
  id: LocalDBKeyID,
  value: ValueType,
  type: LocalDBKeyType
) {
  try {
    const key = await getKey<ValueType>(id, type);
    if (key === undefined) return createKey({ id, [field(type)]: value }, type);
    return updateKey({ id, [field(type)]: value }, type);
  } catch (err) {
    return Promise.reject(err);
  }
}
