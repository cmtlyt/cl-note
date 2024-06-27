import { RequireField } from 'src/utils/types';

import { FieldConfig, hiddenRequiredStringField, idField, schemaBaseField } from './util';

export interface GroupUserSchema {
  id: string;
  groupId: string;
  userId: string;
  createTime: Date;
  updateTime: Date;
  isDeleted: boolean;
}

export type GroupUserInputSchema = RequireField<GroupUserSchema, 'groupId' | 'userId'>;

export const groupUserSchemaConfig: Record<keyof GroupUserInputSchema, FieldConfig> = {
  id: idField,
  groupId: hiddenRequiredStringField,
  userId: hiddenRequiredStringField,
  ...schemaBaseField,
};
