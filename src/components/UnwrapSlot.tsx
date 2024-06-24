interface UnwrapSlotProps {
  children: ReactNode;
  slot?: unknown;
}

export function UnwrapSlot(props: UnwrapSlotProps) {
  const { children } = props;
  return children;
}
