import { PHONE_REG } from '../utils/constant';
import { formatPermission, PermissionMap } from '../utils/permission';
import { RequireField } from '../utils/types';

import {
  FieldConfig,
  hiddenDefaultArrayField,
  hiddenRequiredStringField,
  idField,
  requiredStringField,
  schemaBaseField,
} from './util';

const { DB_SHOW_HIDDEN_FIELD } = PermissionMap;

export interface UserSchema {
  id: string;
  name: string;
  nickName: string;
  password: string;
  age: number;
  sex: string;
  email: string;
  phone: string;
  permission: number;
  avatar: string;
  isDeleted: boolean;
  groupIds: string[];
}

export type UserInputScheam = RequireField<UserSchema, 'name' | 'password'>;

export const userSchemaConfig: Record<keyof UserSchema, FieldConfig> = {
  id: { ...idField, permission: formatPermission(DB_SHOW_HIDDEN_FIELD) },
  name: requiredStringField,
  nickName: { type: 'string' },
  password: { ...hiddenRequiredStringField },
  age: { type: 'number' },
  sex: { type: 'string' },
  email: { type: 'string' },
  phone: { type: 'string', verify: (value: string) => PHONE_REG.test(value) },
  permission: { type: 'number', default: () => 0, permission: formatPermission(DB_SHOW_HIDDEN_FIELD) },
  avatar: { type: 'string' },
  ...schemaBaseField,
  // 所属组id
  groupIds: hiddenDefaultArrayField,
};
