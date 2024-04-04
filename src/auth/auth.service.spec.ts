import { Test } from "@nestjs/testing";
import { JwtService } from '@nestjs/jwt';
import { AuthService } from "./auth.service";

describe('AuthService', () => {
    let AuthService: AuthService;
    let JwtService: JwtService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [],
        })
    });
})