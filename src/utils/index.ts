/* eslint-disable @typescript-eslint/no-explicit-any */
import { getArray } from '@cmtlyt/base';

export function getValueByKey(obj: any, key?: string, prefix = '') {
  if (!key) return obj;
  const keys = key.split('.');
  let result = obj;
  for (let i = 0; i < keys.length; i++) {
    result = result[prefix + keys[i]];
  }
  return result;
}

export function createObjFromKey(value: any, key?: string) {
  if (!key) return value;
  const keys = key.split('.');
  const result: Record<string, any> = {};
  let cur = result;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]] = {};
  }
  cur[keys[keys.length - 1]] = value;
  return result;
}

export function setValueByKey(target: any, value: unknown, key?: string) {
  if (!key) return Object.assign({}, target, value);
  const keys = key.split('.');
  let cur = target;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]] ??= {};
  }
  cur[keys[keys.length - 1]] = value;
  return target;
}

export function formatAmount(input: number, decimal = 2) {
  const amountStr = String(input.toFixed(decimal));
  const [integer, decimalStr] = amountStr.split('.');
  const integerPart = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return /^0*$/.test(decimalStr) ? integerPart : `${integerPart}.${decimalStr}`;
}

export function getSlots(
  input?: ReactNode | React.ReactElement | React.ReactElement[],
  keys: string[] = [],
): Record<string, ReactNode> {
  if (!Array.isArray(input)) return { [(input as any)?.props?.slot || 'default']: input as ReactNode };
  return input.reduce(
    (acc, cur) => {
      if (!cur) return acc;
      let key = cur.props?.slot || 'default';
      if (keys?.length && !keys.includes(key)) key = 'default';
      acc[key] ??= [];
      acc[key].push(cur as ReactNode);
      return acc;
    },
    {} as Record<string, ReactNode[]>,
  );
}

export function selectComp(
  input?: ReactNode | React.ReactElement | React.ReactElement[],
  contition?: unknown | ((info: unknown) => boolean),
  key?: string,
): ReactNode {
  if (!input || !contition) return null;
  const inputList = getArray(input);

  return (inputList.find((item) => {
    const value = getValueByKey(item, key);
    if (typeof contition === 'function') {
      return contition(value);
    }
    return value === contition;
  }) || null) as ReactNode;
}

export function getDataFromForm<K extends string>($form: HTMLFormElement, keys: K[]) {
  const data: Record<K, any> = {} as any;
  keys.forEach((key) => {
    const input = $form[key];
    if (input) data[key] = input.value;
  });
  return data;
}

export function getDataFromFormData(formData: FormData) {
  const data: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}
