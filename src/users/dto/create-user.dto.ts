import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    username:string

    @IsEmail()
    @IsNotEmpty()
    email:{type:string}

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password:string

    @IsNotEmpty()
    @IsPhoneNumber()
    @MaxLength(13)
    phone:string
}
