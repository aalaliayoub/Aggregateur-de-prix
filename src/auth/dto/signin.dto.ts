import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';


export class signDto{
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?:string

    @IsPhoneNumber()
    @IsNotEmpty()
    @IsOptional()
    phone?:string

    @IsNotEmpty()
    password:string

}
