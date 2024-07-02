import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsUrl, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(4, 20)
  @ApiPropertyOptional({ description: '昵称', type: 'string', example: '张三' })
  nickname: string;

  @Length(8, 24)
  @ApiPropertyOptional({
    description: '密码',
    type: 'string',
    example: '123456',
  })
  password: string;

  @IsEmail({ ignore_max_length: true })
  @ApiPropertyOptional({
    description: '邮箱',
    type: 'string',
    example: '123456@qq.com',
  })
  email: string;

  @IsMobilePhone('zh-CN')
  @ApiPropertyOptional({
    description: '手机号',
    type: 'string',
    example: '13800138000',
  })
  phone: string;

  @IsUrl({ require_protocol: true })
  @ApiPropertyOptional({
    description: '头像',
    type: 'string',
    example: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
  })
  avatar: string;
}
