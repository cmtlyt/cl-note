import { useSlots } from '@/hooks/useSlots';
import { useWrapper } from '@/hooks/useWrapper';

interface FullbackProps {
  children: ReactNode;
  wrapper?: React.FC;
  wrapperProps?: Record<string, unknown>;
}

export function Fullback(props: FullbackProps) {
  const { children, wrapper, wrapperProps = {} } = props;

  const slots = useSlots(children, ['fullback']);

  return useWrapper(slots.default || slots.fullback, wrapper, !!wrapper, { wrapperProps });
}
