import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { $ } from 'jotai-signal';

import { ageAtom, nameAtom, updateUserInfo } from '@/storage/user';

export default function List() {
  const changeName = useSetAtom(nameAtom);
  const name = $(nameAtom);

  useEffect(() => {
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
