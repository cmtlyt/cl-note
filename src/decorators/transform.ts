/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity } from '@/entitys/basic';
import { getValueByKey, setValueByKey } from '@/utils';

export function TransformReturn(Clazz: ClassConstructor<BaseEntity>, flatKey?: string, isAsync = true) {
  return (target: any, key: string) => {
    const handler = target[key];
    if (typeof handler !== 'function') throw new Error('handler is not a function');
    const dataHandler = (result: any) => {
      const input = getValueByKey(result, flatKey);
      const instance = new Clazz();
      // @ts-expect-error static function
      const output = Clazz.parse(instance, input);
      if (flatKey) {
        return setValueByKey(result, output, flatKey);
      }
      return output;
    };
    if (isAsync) {
      return {
        value: async (...args: unknown[]) => {
          const result = await handler.apply(target, args);
          return dataHandler(result);
        },
      };
    }
    return {
      value: (...args: unknown[]) => {
        const result = handler.apply(target, args);
        return dataHandler(result);
      },
    };
  };
}

export function transformType<
  F extends (...args: any[]) => any = () => any,
  T = any,
  A = ReturnType<F>,
  R = DeepMerge<T, A>,
>(data: A): IsPromise<A> extends true ? Promise<R> : R {
  return data as any;
}
