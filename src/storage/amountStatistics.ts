import { atomWithObservable } from 'jotai/utils';
import { BehaviorSubject } from 'rxjs';
import { produce } from 'immer';

import { createImmerAtom } from './util';

interface AmountStatisticsStorage {
  outputAmount: number;
  inputAmount: number;
  year: number;
  month: number;
}

const subject$ = new BehaviorSubject<AmountStatisticsStorage>({
  outputAmount: 0,
  inputAmount: 0,
  year: new Date().getFullYear(),
  month: 0,
});

export function updateAmountStatistics(data: Partial<AmountStatisticsStorage>) {
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

export const amountStatisticsAtom = atomWithObservable(() => subject$);

export const outputAmountAtom = createImmerAtom(amountStatisticsAtom, 'outputAmount');
export const inputAmountAtom = createImmerAtom(amountStatisticsAtom, 'inputAmount');
export const yearAtom = createImmerAtom(amountStatisticsAtom, 'year');
export const monthAtom = createImmerAtom(amountStatisticsAtom, 'month');
