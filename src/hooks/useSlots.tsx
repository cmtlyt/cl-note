import { useMemo } from 'react';

import { getSlots } from '@/utils';

export function useSlots<T extends string>(input: ReactNode, keys?: T[]): Record<T | 'default', ReactNode> {
  return useMemo(() => {
    return getSlots(input, keys);
  }, [input, keys]);
}
