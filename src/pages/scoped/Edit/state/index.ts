import { atomWithObservable } from 'jotai/utils';
import { BehaviorSubject } from 'rxjs';

import { AccountTypeVo, ConsumeTypeVo } from '@/types/handler';
import { createImmerAtom, createUpdateFunc } from '@/storage/util';

interface EditStorage {
  type: string;
  consumeTypeList: ConsumeTypeVo[];
  accountTypeList: AccountTypeVo[];
}

const subject$ = new BehaviorSubject<EditStorage>({
  type: 'pay',
  consumeTypeList: [],
  accountTypeList: [],
});

export const updateEditStorage = createUpdateFunc(subject$);

export function getEditStorage() {
  const storage = subject$.getValue();
  return storage as EditStorage;
}

export const editPageAtom = atomWithObservable(() => subject$);

export const typeAtom = createImmerAtom(editPageAtom, 'type');
export const consumeTypeListAtom = createImmerAtom(editPageAtom, 'consumeTypeList');
export const accountTypeListAtom = createImmerAtom(editPageAtom, 'accountTypeList');
