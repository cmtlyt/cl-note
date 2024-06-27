/* eslint-disable @typescript-eslint/no-explicit-any */
import { getType } from '../utils';
import { checkPermission } from '../utils/permission';
import { storage } from '../utils/storage';

import { AccountTypeInputSchema, AccountTypeSchema, accountTypeSchemaConfig } from './accountType';
import { BillInputSchema, BillSchema, billSchemaConfig } from './bill';
import { ConsumeTypeInputSchema, ConsumeTypeSchema, consumeTypeSchemaConfig } from './consumeType';
import { GroupInputSchema, GroupSchema, groupSchemaConfig } from './group';
import { GroupBillInputSchema, GroupBillSchema, groupBillSchemaConfig } from './groupBill';
import { GroupUserInputSchema, GroupUserSchema, groupUserSchemaConfig } from './groupUser';
import { SessionInputSchema, SessionSchema, sessionSchemaConfig } from './session';
import { UserInputScheam, UserSchema, userSchemaConfig } from './user';
import { FieldConfig, getTypeDefaultValue } from './util';

interface DBScheam {
  user: UserSchema;
  session: SessionSchema;
  group: GroupSchema;
  groupUser: GroupUserSchema;
  groupBill: GroupBillSchema;
  consumeType: ConsumeTypeSchema;
  accountType: AccountTypeSchema;
  bill: BillSchema;
}

interface DBInputSchema {
  user: UserInputScheam;
  session: SessionInputSchema;
  group: GroupInputSchema;
  groupUser: GroupUserInputSchema;
  groupBill: GroupBillInputSchema;
  consumeType: ConsumeTypeInputSchema;
  accountType: AccountTypeInputSchema;
  bill: BillInputSchema;
}

const dbSchema: Record<keyof DBScheam, Record<any, FieldConfig>> = {
  // 用户表
  user: userSchemaConfig,
  // 会话表
  session: sessionSchemaConfig,
  // 分组表
  group: groupSchemaConfig,
  // 用户/分组中间表
  groupUser: groupUserSchemaConfig,
  // 账单/分组中间表
  groupBill: groupBillSchemaConfig,
  // 消费类型
  consumeType: consumeTypeSchemaConfig,
  accountType: accountTypeSchemaConfig,
  // 账单表
  bill: billSchemaConfig,
};

export type SchemaNames = keyof DBScheam;

export type SchemaData<T extends SchemaNames> = DBScheam[T];
export type SchemaInputData<T extends SchemaNames> = DBInputSchema[T];

export async function initSchema() {
  await Promise.all(Object.keys(dbSchema).map((dbName) => storage.init(dbName as SchemaNames, {} as any)));
}

export function verifySchema<K extends SchemaNames>(
  dbName: K,
  data: any,
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

export async function formatVo<K extends SchemaNames>(
  schemaId: K,
  data: SchemaData<K>,
  userPermission: number,
  isJoinCall = false,
): Promise<SchemaData<K>> {
  const schema = dbSchema[schemaId];
  if (!schema) return data;
  const newData: Record<string, any> = { ...data };
  for (const key in schema) {
    const _key: any = schema[key].alias || key;
    if (schema[key].join && !isJoinCall) {
      const { schema: joinSchemaName, field: joinSchemaKey } = schema[key].join;
      const joinValue = newData[key];
      const [joinData] = await storage.find(joinSchemaName, {
        matcher: (item) => (item as any)[joinSchemaKey] === joinValue,
      });
      newData[_key] = await formatVo(joinSchemaName as any, joinData, userPermission, true);
    }
    if (!checkPermission(userPermission, schema[key].permission)) delete newData[key as any];
    else if (!newData[_key]) newData[_key] = getTypeDefaultValue(schema[key].type);
    if (schema[key].dtoTransform) newData[_key] = schema[key].dtoTransform(newData[_key]);
  }
  return newData as any;
}

export async function formatVos<K extends SchemaNames>(
  schemaId: K,
  data: SchemaData<K>[],
  userPermission: number,
): Promise<SchemaData<K>[]> {
  return Promise.all(data.map((item) => formatVo(schemaId, item, userPermission)));
}
