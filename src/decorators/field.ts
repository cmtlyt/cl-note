import { DecoratorControler } from './util';

import {
  ALIAS_KEY,
  DEFAULT_KEY,
  FIELD_IGNORE_KEY,
  FIELD_PREFIX_KEY,
  IS_ARRAY_KEY,
  TYPE_KEY,
} from '@/constant/decoratorField';

export function Default(value: unknown) {
  return (target: unknown, key: string) => {
    DecoratorControler.setFieldConfig(target, key, DEFAULT_KEY, value);
  };
}

export function getDefault(target: unknown, key: string) {
  return DecoratorControler.getFieldConfig(target, key, DEFAULT_KEY);
}

export function Type(value: unknown) {
  return (target: unknown, key: string) => {
    DecoratorControler.setFieldConfig(target, key, TYPE_KEY, value);
  };
}

export function getType(target: unknown, key: string) {
  return DecoratorControler.getFieldConfig(target, key, TYPE_KEY);
}

export function Alias(value: string) {
  return (target: unknown, key: string) => {
    DecoratorControler.setFieldConfig(target, key, ALIAS_KEY, value);
  };
}

export function getAlias(target: unknown, key: string): string {
  return DecoratorControler.getFieldConfig(target, key, ALIAS_KEY);
}

export function IsArray() {
  return (target: unknown, key: string) => {
    DecoratorControler.setFieldConfig(target, key, IS_ARRAY_KEY, true);
  };
}

export function getIsArray(target: unknown, key: string): boolean {
  return DecoratorControler.getFieldConfig(target, key, IS_ARRAY_KEY) || false;
}

export function NoPrefix() {
  return (target: unknown, key: string) => DecoratorControler.setFieldConfig(target, key, FIELD_IGNORE_KEY, true);
}

export function getNoPrefix(target: unknown, key: string): boolean {
  return DecoratorControler.getFieldConfig(target, key, FIELD_IGNORE_KEY) || false;
}

export function FieldPrefix(value: string) {
  return (target: unknown) => {
    DecoratorControler.setClassConfig(target, FIELD_PREFIX_KEY, value);
  };
}

export function getFieldPrefix(target: unknown): string {
  return DecoratorControler.getClassConfig(target, FIELD_PREFIX_KEY) || '';
}
