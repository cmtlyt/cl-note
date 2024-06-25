import { useSlots } from '@/hooks/useSlots';
import { useWrapper } from '@/hooks/useWrapper';

interface FullbackProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapper?: React.FC<any>;
  wrapperProps?: Record<string, unknown>;
}

export function Fullback(props: FullbackProps) {
  const { children, wrapper, wrapperProps = {} } = props;

  const slots = useSlots(children, ['fullback']);

  return useWrapper(slots.default || slots.fullback, wrapper, !!wrapper, { wrapperProps });
}
