/* eslint-disable @typescript-eslint/no-explicit-any */
import { getType, randomString } from './utils';
import { PHONE_REG } from './utils/constant';
import { checkPermission, formatPermission, PermissionMap } from './utils/permission';
import { storage } from './utils/storage';

const { DB_SHOW_HIDDEN_FIELD } = PermissionMap;

interface DBScheam {
  user: {
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
  };
  session: {
    id: string;
    info: string;
    createTime: Date;
    updateTime: Date;
    expireTime: Date;
  };
  group: {
    id: string;
    name: string;
    ownerId: string;
    createTime: Date;
    updateTime: Date;
    isDeleted: boolean;
  };
  groupUser: {
    id: string;
    groupId: string;
    userId: string;
    createTime: Date;
    updateTime: Date;
  };
  groupBill: {
    id: string;
    groupId: string;
    billId: string;
    createTime: Date;
    updateTime: Date;
  };
  bill: {
    id: string;
    type: string;
    title: string;
    amount: number;
    date: Date;
    createTime: Date;
    updateTime: Date;
    userId: string;
    groupIds: string[];
  };
}

type RequireField<T, K extends keyof T> = Partial<Pick<T, Exclude<keyof T, K>>> & Pick<T, K>;

interface DBInputSchema {
  user: RequireField<DBScheam['user'], 'name' | 'password'>;
  session: RequireField<DBScheam['session'], 'info'>;
  group: RequireField<DBScheam['group'], 'name' | 'ownerId'>;
  groupUser: RequireField<DBScheam['groupUser'], 'groupId' | 'userId'>;
  groupBill: RequireField<DBScheam['groupBill'], 'groupId' | 'billId'>;
  bill: RequireField<DBScheam['bill'], 'type' | 'title' | 'amount' | 'date' | 'userId'>;
}

interface FieldConfig {
  type: string;
  required?: boolean;
  default?: () => any;
  verify?: (value: any) => boolean;
  autoUpdate?: boolean;
  permission?: number;
  dtoTransform?: (value: any) => any;
}

const idField = { type: 'string', default: () => randomString(16) };
const isDeletedField = { type: 'boolean', default: () => false, permission: formatPermission(DB_SHOW_HIDDEN_FIELD) };
const requiredStringField = { type: 'string', required: true };
const hiddenRequiredStringField = {
  type: 'string',
  required: true,
  permission: formatPermission(DB_SHOW_HIDDEN_FIELD),
};
const requiredNumberField = { type: 'number', required: true };
const defaultArrayField = { type: 'array', default: () => [] };
const hiddenDefaultArrayField = { ...defaultArrayField, permission: formatPermission(DB_SHOW_HIDDEN_FIELD) };
const updateTimeField = {
  type: 'date',
  default: () => new Date(),
  permission: formatPermission(DB_SHOW_HIDDEN_FIELD),
  dtoTransform: (value: any) => value.toString(),
};
const createTimeField = { type: 'date', default: () => new Date(), dtoTransForm: (value: any) => value.toString() };
const schemaTimeField = { createTime: createTimeField, updateTime: updateTimeField };

const dbSchema: Record<keyof DBScheam, Record<any, FieldConfig>> = {
  // 用户表
  user: {
    id: { ...idField, permission: formatPermission(DB_SHOW_HIDDEN_FIELD) },
    name: requiredStringField,
    nickName: { type: 'string' },
    password: { ...hiddenRequiredStringField },
    age: { type: 'number' },
    sex: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string', verify: (value) => PHONE_REG.test(value) },
    permission: { type: 'number', default: () => 0, permission: formatPermission(DB_SHOW_HIDDEN_FIELD) },
    avatar: { type: 'string' },
    isDeleted: isDeletedField,
    ...schemaTimeField,
    // 所属组id
    groupIds: hiddenDefaultArrayField,
  },
  // 会话表
  session: {
    id: idField,
    info: requiredStringField,
    expireTime: { type: 'date', default: () => new Date(new Date().getTime() + 1000 * 60 * 5) },
    ...schemaTimeField,
  },
  // 分组表
  group: {
    id: idField,
    name: requiredStringField,
    ownerId: hiddenRequiredStringField,
    isDeleted: isDeletedField,
    ...schemaTimeField,
  },
  // 用户/分组中间表
  groupUser: { id: idField, groupId: hiddenRequiredStringField, userId: hiddenRequiredStringField, ...schemaTimeField },
  // 账单/分组中间表
  groupBill: { id: idField, groupId: hiddenRequiredStringField, billId: hiddenRequiredStringField, ...schemaTimeField },
  // 账单表
  bill: {
    id: idField,
    type: requiredStringField,
    title: requiredStringField,
    amount: requiredNumberField,
    date: { type: 'date', required: true },
    ...schemaTimeField,
    // 所属用户id
    userId: hiddenRequiredStringField,
    // 所属组id
    groupIds: hiddenDefaultArrayField,
  },
};

export type SchemaNames = keyof typeof dbSchema;

export type SchemaData<T extends SchemaNames> = DBScheam[T];
export type SchemaInputData<T extends SchemaNames> = DBInputSchema[T];

export async function initSchema() {
  await Promise.all(Object.keys(dbSchema).map((dbName) => storage.init(dbName as SchemaNames, {} as any)));
}

function getTypeDefaultValue(type: any) {
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

export function verifySchema<K extends SchemaNames>(
  dbName: K,
  data: SchemaInputData<K>,
): [boolean, string | undefined, SchemaData<K>?] {
  const tbSchema = dbSchema[dbName] as any;
  if (!tbSchema) return [false, `未找到${dbName}表`];
  const newData: Record<string, any> = {};
  const autoUpdateField: string[] = [];
  for (const key in tbSchema) {
    // 获取已有字段
    const fieldValue: any = (newData[key] = (data as Record<string, any>)[key]);
    const schemaInfo: any = tbSchema[key];
    // 必填验证
    if (schemaInfo.required && !fieldValue) return [false, `缺少${key}字段`];
    // 处理默认值
    if (schemaInfo.default && !fieldValue) newData[key] = schemaInfo.default();
    // 类型验证
    if (schemaInfo.required && getType(fieldValue) !== schemaInfo.type)
      return [false, `字段${key}类型错误, 期望${schemaInfo.type}, 实际${getType(fieldValue)}`];
    if (schemaInfo.verify && fieldValue && !schemaInfo.verify(fieldValue)) return [false, `字段${key}验证失败`];
    // 暂存自动更新
    if (schemaInfo.autoUpdate) autoUpdateField.push(key);
  }
  // 处理自动更新
  for (const key of autoUpdateField) newData[key] = tbSchema[key].default();
  return [true, undefined, newData as any];
}

export function formatDto<K extends SchemaNames>(
  schemaId: K,
  data: SchemaData<K>,
  userPermission: number,
): SchemaData<K> {
  const schema = dbSchema[schemaId];
  if (!schema) return data;
  const newData: Record<string, any> = { ...data };
  for (const key in schema) {
    const _key: any = schema.alias || key;
    if (!checkPermission(userPermission, schema[key].permission)) delete newData[key as any];
    else if (!newData[_key]) newData[_key] = getTypeDefaultValue(schema[key].type);
    if (schema[key].dtoTransform) newData[_key] = schema[key].dtoTransform(newData[_key]);
  }
  return newData as any;
}
