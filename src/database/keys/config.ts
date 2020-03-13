import { LocalDBKeyDoc } from '.';

/* eslint-disable @typescript-eslint/camelcase */

export const name = 'keys';

export type ColumnsMap = {
  [K in keyof LocalDBKeyDoc]: string;
};

export const columns: ColumnsMap = {
  id: 'id',
  integerValue: 'integer_value',
  integer_value: 'integerValue',
  textValue: 'text_value',
  text_value: 'textValue',
};
