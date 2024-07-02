import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @Length(4, 20)
  @ApiProperty({ description: '昵称', type: 'string', example: '张三' })
  nickname: string;

  @IsNotEmpty()
  @Length(8, 24)
  @ApiProperty({ description: '密码', type: 'string', example: '123456' })
  password: string;
}
