import { BaseEntity } from './basic';

import { Type } from '@/decorators';

export class UserEntity extends BaseEntity {
  @Type(Number)
  age!: number;

  @Type(String)
  avatar!: string;

  @Type(String)
  email!: string;

  @Type(String)
  name!: string;

  @Type(String)
  phone!: string;

  @Type(String)
  sex!: string;
}
