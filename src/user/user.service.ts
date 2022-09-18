import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User1 } from './user1.entity';
import { CreateUserDto } from '../api/user/user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User1)
  private readonly repository: Repository<User1>;

  public getUser(id: number): Promise<User1> {
    // @ts-ignore
    return this.repository.findOne(id);
  }

  public createUser(body: CreateUserDto): Promise<User1> {
    const user: User1 = new User1();

    user.name = body.name;
    user.email = body.email;

    return this.repository.save(user);
  }
}
