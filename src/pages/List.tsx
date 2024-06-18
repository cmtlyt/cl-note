import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { $ } from 'jotai-signal';

import { ageAtom, nameAtom, updateUserInfo } from '@/storage/user';
import { TestService } from '@/api/test';

export default function List() {
  const changeName = useSetAtom(nameAtom);
  const name = $(nameAtom);

  useEffect(() => {
    console.log('test', TestService.test());
    console.log('test2', TestService.test2());
    console.log('test3', TestService.test3());
    setTimeout(() => {
      updateUserInfo({ age: 20 });
    }, 1000);
  }, []);

  console.log('runder');

  return (
    <div>
      list <button onClick={() => changeName('123')}>changeName</button> {name}-{$(ageAtom)}
    </div>
  );
}
