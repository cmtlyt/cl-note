import { selectComp } from '@/utils';

interface CaseProps {
  when: unknown | ((info: unknown) => boolean);
  slot?: unknown;
  children: ReactNode;
}

export function Case(props: CaseProps) {
  const { when, children } = props;
  const Comp = selectComp(children, when, 'props.slot');

  return Comp;
}
