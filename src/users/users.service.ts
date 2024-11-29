import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/Schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly UsersModele: Model<User>){}
  async create(createUserDto: CreateUserDto):Promise<User>{
    try{
      createUserDto.password=await bcrypt.hash(createUserDto.password,10)
      const newuser = new this.UsersModele(createUserDto)
      return await newuser.save()
    
    }
    catch(error){
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Invalid data provided');
      }
      if(Object.keys(error.keyPattern)[0]==="username"){
        throw new BadRequestException('this username already exists');
      }
      if(Object.keys(error.keyPattern)[0]==="phone"){
        throw new BadRequestException('this phone already exists');
      }
      if(Object.keys(error.keyPattern)[0]==="email"){
        throw new BadRequestException('This email already exists');
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(){
    return await this.UsersModele.find().exec()
  }

  async findOne(id:string) {
    return await this.UsersModele.findById({_id:id})
  }
  async findbyemail(email:string){
    return this.UsersModele.findOne({email:email})
  }
  async update(id:string, updateUserDto: UpdateUserDto) {
    return await this.UsersModele.updateOne({_id:id},{$set:updateUserDto})
  }

  async remove(id:string) {
    const user =await this.UsersModele.findOneAndDelete({_id:id})
    if(!user){
      throw new BadRequestException("aucun utilisatuer trover")
    }
    return user
  }

}
