import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ){}

    async generateToken(user: User): Promise<string> {
        const payload: JwtPayloadDto = {
            email: user.email
        };

        return this.jwtService.signAsync(payload);
    }
}
