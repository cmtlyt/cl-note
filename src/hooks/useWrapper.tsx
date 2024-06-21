interface NeedWrapperOptions<T> {
  wrapperProps: T extends React.FC<infer U> ? Omit<U, 'children'> : Record<string, unknown>;
}

export function useWrapper<C extends React.FC<{ children: React.ReactNode }>>(
  children: React.ReactNode,
  Wrapper: C,
  flag: boolean,
  options?: NeedWrapperOptions<C>,
): React.ReactNode {
  if (flag) {
    // return Wrapper({ children, ...(options?.wrapperProps || {}) });
    // @ts-expect-error ts(2322): Type '{ children: ReactNode; wrapperProps: {}; }' is not assignable to type 'IntrinsicAttributes & { children?: ReactNode; }'.
    return <Wrapper {...(options?.wrapperProps || {})}>{children}</Wrapper>;
  }
  return children;
}
