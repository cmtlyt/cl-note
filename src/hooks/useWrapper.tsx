interface NeedWrapperOptions<T extends React.FC<{ children: ReactNode }>> {
  wrapperProps: Omit<FCProps<T>, 'children'>;
}

export function useWrapper<C extends React.FC<{ children: ReactNode }>>(
  children: ReactNode,
  Wrapper: C | undefined,
  flag: boolean,
  options?: NeedWrapperOptions<C>,
): ReactNode {
  if (Wrapper && flag) {
    // return Wrapper({ children, ...(options?.wrapperProps || {}) });
    // @ts-expect-error ts(2322): Type '{ children: ReactNode; wrapperProps: {}; }' is not assignable to type 'IntrinsicAttributes & { children?: ReactNode; }'.
    return <Wrapper {...(options?.wrapperProps || {})}>{children}</Wrapper>;
  }
  return children;
}
