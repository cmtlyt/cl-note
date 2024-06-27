import { useRef } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';

export function useActionDataReload<R>(): R | null {
  const actionData = useActionData() as R;
  const needReload = useRef(true);
  const navigate = useNavigate();

  if (actionData) {
    if (needReload.current) {
      needReload.current = false;
      Promise.resolve(() => navigate('', { replace: true }));
      return actionData;
    } else {
      needReload.current = true;
    }
  }

  return null;
}
