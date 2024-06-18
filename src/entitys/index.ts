import { BaseEntity } from './basic';

import { Alias, Default, FieldPrefix, NoPrefix, Type } from '@/decorators/field';

export class TestData extends BaseEntity {
  @Type(String)
  @Alias('a')
  aValue!: string;

  @Type(String)
  b!: string;
}

export class Test extends BaseEntity {
  @Default('默认值')
  @Type(Number)
  @Alias('test_v')
  value!: number;

  @Type(TestData)
  @Alias('aa.bb.data')
  data!: TestData;
}

@FieldPrefix('test_')
export class Test2 extends BaseEntity {
  @Alias('v')
  @Type(Number)
  value!: number;

  @Type(String)
  @NoPrefix()
  noPreValue!: string;
}
