import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('开发中')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    // userService.init();
  }

  @Post()
  @ApiOperation({ summary: '登录', description: '登录' })
  @ApiResponse({ status: 200, description: '登录成功' })
  @ApiBody({ type: UserLoginDto, required: true, description: '登录信息' })
  login(@Body() userInfo: UserLoginDto) {
    console.log(userInfo);
  }
}
