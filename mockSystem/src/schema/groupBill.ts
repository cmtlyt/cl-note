import { RequireField } from 'src/utils/types';

import { FieldConfig, hiddenRequiredStringField, idField, schemaBaseField } from './util';

export interface GroupBillSchema {
  id: string;
  groupId: string;
  billId: string;
  createTime: Date;
  updateTime: Date;
  isDeleted: boolean;
}

export type GroupBillInputSchema = RequireField<GroupBillSchema, 'groupId' | 'billId'>;

export const groupBillSchemaConfig: Record<keyof GroupBillSchema, FieldConfig> = {
  id: idField,
  groupId: hiddenRequiredStringField,
  billId: hiddenRequiredStringField,
  ...schemaBaseField,
};
