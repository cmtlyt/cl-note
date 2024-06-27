import { atomWithObservable } from 'jotai/utils';
import { BehaviorSubject } from 'rxjs';

import { createImmerAtom, createUpdateFunc } from './util';

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

export const updateUserInfo = createUpdateFunc(subject$);

export const userInfoAtom = atomWithObservable(() => subject$);

export const nameAtom = createImmerAtom(userInfoAtom, 'name');
export const ageAtom = createImmerAtom(userInfoAtom, 'age');
export const sexAtom = createImmerAtom(userInfoAtom, 'sex');
export const phoneAtom = createImmerAtom(userInfoAtom, 'phone');
export const emailAtom = createImmerAtom(userInfoAtom, 'email');
export const avatarAtom = createImmerAtom(userInfoAtom, 'avatar');
