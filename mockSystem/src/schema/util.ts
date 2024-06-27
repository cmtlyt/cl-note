/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomId } from '../utils';
import { formatPermission, PermissionMap } from '../utils/permission';

import type { SchemaNames } from '.';

const { DB_SHOW_HIDDEN_FIELD } = PermissionMap;

export interface FieldConfig {
  type: string;
  required?: boolean;
  default?: () => any;
  verify?: (value: any) => boolean;
  autoUpdate?: boolean;
  permission?: number;
  dtoTransform?: (value: any) => any;
  join?: {
    schema: SchemaNames;
    field: string;
  };
  alias?: string;
}

export const idField = { type: 'string', default: () => randomId(16) };
export const isDeletedField = {
  type: 'boolean',
  default: () => false,
  permission: formatPermission(DB_SHOW_HIDDEN_FIELD),
};
export const requiredStringField = { type: 'string', required: true };
export const hiddenRequiredStringField = {
  type: 'string',
  required: true,
  permission: formatPermission(DB_SHOW_HIDDEN_FIELD),
};
export const requiredNumberField = { type: 'number', required: true };
export const defaultArrayField = { type: 'array', default: () => [] };
export const hiddenDefaultArrayField = { ...defaultArrayField, permission: formatPermission(DB_SHOW_HIDDEN_FIELD) };
export const updateTimeField = {
  type: 'date',
  default: () => new Date(),
  permission: formatPermission(DB_SHOW_HIDDEN_FIELD),
  dtoTransform: (value: any) => value?.toString?.(),
};
export const createTimeField = {
  type: 'date',
  default: () => new Date(),
  dtoTransForm: (value: any) => value?.toString?.(),
};
export const schemaBaseField = { createTime: createTimeField, updateTime: updateTimeField, isDeleted: isDeletedField };

export function getTypeDefaultValue(type: any) {
  const typeMap: Record<string, any> = {
    string: '',
    number: 0,
    boolean: false,
    date: new Date(),
    array: [],
    object: {},
  };
  return typeMap[type];
}
