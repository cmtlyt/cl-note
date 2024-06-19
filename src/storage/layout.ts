import { atomWithObservable } from 'jotai/utils';
import { BehaviorSubject } from 'rxjs';
import { produce } from 'immer';

import { createImmerAtom } from './util';

interface LayoutStorage {
  showLoading: boolean;
}

const subject$ = new BehaviorSubject<LayoutStorage>({
  showLoading: false,
});

export function updateLayout(data: Partial<LayoutStorage>) {
  const oldData = subject$.getValue();
  subject$.next(
    produce(oldData, (draft) => {
      for (const key in draft) {
        // @ts-expect-error is any
        draft[key] = data[key];
      }
    }),
  );
}

export const layoutAtom = atomWithObservable(() => subject$);

export const showLoadingAtom = createImmerAtom(layoutAtom, 'showLoading');
