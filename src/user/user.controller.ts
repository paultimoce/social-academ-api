import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login-request.dto';
import { User } from './entities/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<User> {    
    return this.userService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto>  {
    return this.userService.login(loginDto);
  }

  @Get('user/confirm/:token')
  confirm(@Param('token') token: string) {
    return this.userService.confirm(token);
  }

  @Delete('user/drop/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
