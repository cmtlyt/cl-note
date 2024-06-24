/* eslint-disable @typescript-eslint/no-explicit-any */
type ClassConstructor<T> = {
  new (...args: any[]): T;
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type IsPromise<T> = T extends Promise<any> ? true : false;

type HasPromise<T extends any[]> = T extends [infer U, ...infer V] ? IsPromise<U> | HasPromise<V> : false;

type UsePromiseWrapper<P, T> = P extends true ? Promise<T> : T;

type DeepMerge<A, B, T = UnwrapPromise<A>, U = UnwrapPromise<B>> = U extends null
  ? T
  : U extends object
    ? {
        [K in keyof T | keyof U]: K extends keyof T & keyof U ? DeepMerge<T[K], U[K]> : K extends keyof T ? T[K] : U[K];
      }
    : T extends object
      ? T
      : U;

type UnwrapAxiosResponse<F, T = ReturnType<F>> =
  T extends Promise<import('axios').AxiosResponse<infer U>> ? { data: U } : T;

type PatchReturnType<T, P, R = ReturnType<T>, N = HasPromise<[R, P]>> = UsePromiseWrapper<N, DeepMerge<R, P>>;

type PatchResponseType<T, P, R = UnwrapAxiosResponse<T>> = PatchReturnType<T, P, R, true>;

interface BaseCompProps<T = HTMLElement> extends React.HTMLAttributes<T> {}

interface BaseUnoProps extends HTMLAttributes {
  children?: ReactNode;
}

type ReactNode = React.ReactNode;

type FCProps<C extends React.FC<any>> = C extends React.FC<infer P> ? P : Record<string, any>;
