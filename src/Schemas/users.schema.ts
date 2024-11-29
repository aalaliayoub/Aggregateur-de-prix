import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


import { Document } from "mongoose";


@Schema()
export class User extends Document{
    @Prop({required:true,unique:true})
    username:string

    @Prop({required:true,unique:true})
    email:string

    @Prop({required:true})
    password:string

    @Prop({default:Date.now()})
    createdAt:Date

    @Prop({required:true,unique:true})
    phone:string
    
    @Prop({default:Math.floor(100000+Math.random()*900000)})
    OTP:number

}
export const Users=SchemaFactory.createForClass(User)