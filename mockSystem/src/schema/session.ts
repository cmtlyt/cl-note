import { RequireField } from 'src/utils/types';

import { FieldConfig, idField, requiredStringField, schemaBaseField } from './util';

export interface SessionSchema {
  id: string;
  info: string;
  createTime: Date;
  updateTime: Date;
  expireTime: Date;
}

export type SessionInputSchema = RequireField<SessionSchema, 'info'>;

export const sessionSchemaConfig: Record<keyof SessionSchema, FieldConfig> = {
  id: idField,
  info: requiredStringField,
  expireTime: { type: 'date', default: () => new Date(new Date().getTime() + 1000 * 60 * 5) },
  ...schemaBaseField,
};
