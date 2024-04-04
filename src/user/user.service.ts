import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ObjectId, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from './entities/user.entity';
import { LoginDto } from './dto/login-request.dto';
import { randomUUID } from 'crypto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService
  ){}

  async register(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email: registerDto.email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists!');
    }

    const user = new User();
    user.email = registerDto.email;
    user.password = await bcrypt.hash(registerDto.password, 10);
    user.confirmed = false;
    user.confirmationToken = randomUUID();
    user.resetToken = undefined;
    user.name = registerDto.name;
    user.type = registerDto.teacher === true ? UserType.Teacher : UserType.Student;

    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });    

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return {
        access_token: await this.authService.generateToken(user),
      }
    }

    throw new UnauthorizedException();
  }

  async confirm(token: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ confirmationToken: token });
    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    user.confirmed = true;
    user.confirmationToken = undefined;
    await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({_id: new ObjectId(id) });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.remove(user);    
  }
}
