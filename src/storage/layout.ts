import { atomWithObservable } from 'jotai/utils';
import { BehaviorSubject } from 'rxjs';

import { createImmerAtom, createUpdateFunc } from './util';

interface Slots {
  header?: ReactNode;
  footer?: ReactNode;
  fixed?: ReactNode;
  default?: ReactNode;
}

interface LayoutStorage {
  showLoading: boolean;
  showNavBar: boolean;
  slotsInfo: { path: string; slots: Slots };
}

const subject$ = new BehaviorSubject<LayoutStorage>({
  showLoading: false,
  showNavBar: true,
  slotsInfo: { path: '', slots: {} },
});

export const updateLayout = createUpdateFunc(subject$);

export const layoutAtom = atomWithObservable(() => subject$);

export const showLoadingAtom = createImmerAtom(layoutAtom, 'showLoading');
export const showNavBarAtom = createImmerAtom(layoutAtom, 'showNavBar');
export const slotsInfoAtom = createImmerAtom(layoutAtom, 'slotsInfo');
