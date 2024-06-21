/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, type WritableAtom } from 'jotai';
import { produce } from 'immer';

type AtomValue<T> =
  T extends WritableAtom<infer V, any, any>
    ? V extends Promise<infer R>
      ? R
      : V extends Record<any, any>
        ? V
        : never
    : never;

export function createAtomFromImmer<
  T extends WritableAtom<any, any, any>,
  K extends keyof AtomValue<T>,
  V extends AtomValue<T>[K],
>(immerAtom: T, key: K, onChange?: WritableAtom<V, [value: V], void>['write']): WritableAtom<V, [value: V], void> {
  return atom(
    (get) => get(immerAtom)[key],
    (get, set, value: V) => {
      set(immerAtom, (draft: any) => {
        draft[key] = value;
      });
      onChange?.(get, set, value);
    },
  );
}

export function createImmerAtom<
  T extends WritableAtom<any, any, any>,
  K extends keyof AtomValue<T>,
  V extends AtomValue<T>[K],
>(immerAtom: T, key: K, onChange?: WritableAtom<V, [value: V], void>['write']): WritableAtom<V, [value: V], void> {
  return atom(
    (get) => get(immerAtom)[key],
    (get, set, value: V) => {
      set(
        immerAtom,
        produce(get(immerAtom), (draft: any) => {
          draft[key] = value;
        }),
      );
      onChange?.(get, set, value);
    },
  );
}
