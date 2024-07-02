import { IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @Length(4, 20)
  nickname: string;

  @IsNotEmpty()
  @Length(8, 24)
  password: string;
}
