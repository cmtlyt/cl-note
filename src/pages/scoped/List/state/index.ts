import { atomWithObservable } from 'jotai/utils';
import { BehaviorSubject } from 'rxjs';

import { createImmerAtom, createUpdateFunc } from '@/storage/util';
import { BillVo } from '@/types/handler';

interface ListStorage {
  billList: BillVo[];
}

const subject$ = new BehaviorSubject<ListStorage>({
  billList: [],
});

export const updateListStorage = createUpdateFunc(subject$);

export function getListStorage() {
  const storage = subject$.getValue();
  return storage as ListStorage;
}

export const listPageAtom = atomWithObservable(() => subject$);

export const billListAtom = createImmerAtom(listPageAtom, 'billList');
