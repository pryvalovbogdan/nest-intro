import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(condition): Promise<User> {
    return this.repository.findOne({ where: condition });
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.email = body.email;
    user.password = body.password;
    user.accountType = body.accountType;

    return this.repository.save(user);
  }
}
