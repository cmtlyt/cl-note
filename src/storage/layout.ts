import { atomWithObservable } from 'jotai/utils';
import { BehaviorSubject } from 'rxjs';
import { produce } from 'immer';

import { createImmerAtom } from './util';

interface LayoutStorage {
  showLoading: boolean;
  showNavBar: boolean;
  slotsInfo: { path: string; slots: Record<string, React.ReactNode> };
}

const subject$ = new BehaviorSubject<LayoutStorage>({
  showLoading: false,
  showNavBar: true,
  slotsInfo: { path: '', slots: {} },
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
export const showNavBarAtom = createImmerAtom(layoutAtom, 'showNavBar');
export const slotsInfoAtom = createImmerAtom(layoutAtom, 'slotsInfo');
