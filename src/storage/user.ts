import { atomWithObservable } from 'jotai/utils';
import { BehaviorSubject } from 'rxjs';
import { produce } from 'immer';

import { createImmerAtom } from './util';

interface UserInfo {
  name: string;
  age: number;
  sex: string;
  phone: string;
  email: string;
  avatar: string;
}

const subject$ = new BehaviorSubject<UserInfo>({
  name: '',
  age: 0,
  sex: '',
  phone: '',
  email: '',
  avatar: '',
});

export function updateUserInfo(data: Partial<UserInfo>) {
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

export const userInfoAtom = atomWithObservable(() => subject$);

export const nameAtom = createImmerAtom(userInfoAtom, 'name');
export const ageAtom = createImmerAtom(userInfoAtom, 'age');
export const sexAtom = createImmerAtom(userInfoAtom, 'sex');
export const phoneAtom = createImmerAtom(userInfoAtom, 'phone');
export const emailAtom = createImmerAtom(userInfoAtom, 'email');
export const avatarAtom = createImmerAtom(userInfoAtom, 'avatar');
