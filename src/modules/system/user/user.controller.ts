import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    // userService.init();
  }

  @Post()
  login(@Body() userInfo: CreateUserDto) {
    console.log(userInfo);
  }
}
