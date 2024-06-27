import { OptionalField, RequireField } from 'src/utils/types';
import { formatPermission, PermissionMap } from 'src/utils/permission';

import { FieldConfig, idField, requiredStringField, schemaBaseField } from './util';

const { DB_SHOW_HIDDEN_FIELD } = PermissionMap;

export interface ConsumeTypeSchema {
  id: string;
  name: string;
  icon: string;
  ownerId?: string;
  ownerGroupId?: string;
  createTime: Date;
  updateTime: Date;
  isDeleted: boolean;
}

export type ConsumeTypeInputSchema = OptionalField<
  RequireField<ConsumeTypeSchema, 'id' | 'icon' | 'name' | 'ownerId' | 'ownerGroupId'>,
  'ownerGroupId' | 'ownerId'
>;

export const consumeTypeSchemaConfig: Record<keyof ConsumeTypeSchema, FieldConfig> = {
  id: idField,
  name: requiredStringField,
  icon: requiredStringField,
  ownerId: { type: 'string', permission: formatPermission(DB_SHOW_HIDDEN_FIELD) },
  ownerGroupId: { type: 'string', permission: formatPermission(DB_SHOW_HIDDEN_FIELD) },
  ...schemaBaseField,
};
