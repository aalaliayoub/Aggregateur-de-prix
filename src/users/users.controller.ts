import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/Schemas/users.schema';
import { AuthGuard } from 'src/guards/auth.guard';
import { authorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/decorators/enums';

//@Roles(Role.Admin)
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto):Promise<User>{
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
