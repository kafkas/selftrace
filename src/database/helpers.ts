import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('main');

export function processRawResult<RawType, ProcessedType, ColumnsType>(
  raw: RawType,
  columns: ColumnsType
): ProcessedType {
  const processed: ProcessedType = {};
  Object.keys(raw).forEach(rawKey => {
    const val = raw[rawKey];
    const key = columns[rawKey];
    processed[key] = val;
  });
  return processed;
}
