import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';

import { User1 } from './user1.entity';
import { UserService } from './user.service';
import { CreateUserDto } from '../api/user/user.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User1> {
    return this.service.getUser(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<User1> {
    return this.service.createUser(body);
  }
}
