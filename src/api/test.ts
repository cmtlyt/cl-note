import { TransformReturn, transformType } from '@/decorators';
import { Test, Test2, TestData } from '@/entitys';

function test() {
  return Promise.resolve({
    test_v: '1.3',
    noPreValue: 2.3,
    aa: { bb: { cc: 'cc', ee: 'ee', data: { a: 'a', b: 'b' } }, dd: 'dd' },
  });
}

export class TestService {
  @TransformReturn(Test)
  static test() {
    return transformType<typeof test, Promise<Test>>(test());
  }
  @TransformReturn(Test2)
  static test2() {
    return transformType<typeof test, Promise<Test2>>(test());
  }
  @TransformReturn(TestData, 'aa.bb.data')
  static test3() {
    return transformType<typeof test, { aa: { bb: { data: TestData } } }>(test());
  }
}
