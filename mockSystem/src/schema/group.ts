import { RequireField } from 'src/utils/types';

import { FieldConfig, hiddenRequiredStringField, idField, requiredStringField, schemaBaseField } from './util';

export interface GroupSchema {
  id: string;
  name: string;
  ownerId: string;
  createTime: Date;
  updateTime: Date;
  isDeleted: boolean;
}

export type GroupInputSchema = RequireField<GroupSchema, 'name' | 'ownerId'>;

export const groupSchemaConfig: Record<keyof GroupSchema, FieldConfig> = {
  id: idField,
  name: requiredStringField,
  ownerId: hiddenRequiredStringField,
  ...schemaBaseField,
};
