import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class RegisterDto {
    @ApiProperty({default: 'joe@doe.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({default: 'my secure password'})
    @IsNotEmpty()
    password: string;

    @ApiProperty({default: 'Joe Doe'})
    @IsOptional()
    name: string;

    @ApiProperty({default: 30})
    @IsOptional()
    @IsNumber()
    age: number;

    @ApiProperty({default: false})
    @IsOptional()
    teacher: boolean;
}
