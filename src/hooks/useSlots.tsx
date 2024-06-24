import { useMemo } from 'react';

import { getSlots } from '@/utils';

export function useSlots(input: ReactNode, keys?: string[]) {
  return useMemo(() => {
    return getSlots(input, keys);
  }, [input, keys]);
}
