import { RequireField } from 'src/utils/types';

import {
  FieldConfig,
  hiddenDefaultArrayField,
  hiddenRequiredStringField,
  idField,
  requiredNumberField,
  requiredStringField,
  schemaBaseField,
} from './util';

export interface BillSchema {
  id: string;
  type: string;
  title: string;
  amount: number;
  date: Date;
  createTime: Date;
  updateTime: Date;
  isDeleted: boolean;
  userId: string;
  groupIds: string[];
  consumeTypeId: string;
  accountTypeId: string;
}

export type BillInputSchema = RequireField<BillSchema, 'type' | 'title' | 'amount' | 'date' | 'userId'>;

export const billSchemaConfig: Record<keyof BillSchema, FieldConfig> = {
  id: idField,
  type: requiredStringField,
  title: requiredStringField,
  amount: requiredNumberField,
  date: { type: 'date', required: true },
  ...schemaBaseField,
  // 所属用户id
  userId: hiddenRequiredStringField,
  // 所属组id
  groupIds: hiddenDefaultArrayField,
  // 所属类型id
  accountTypeId: { ...hiddenRequiredStringField, join: { schema: 'accountType', field: 'id' }, alias: 'accountInfo' },
  // 消费类型id
  consumeTypeId: {
    ...hiddenRequiredStringField,
    join: { schema: 'consumeType', field: 'id' },
    alias: 'consumeTypeInfo',
  },
};
