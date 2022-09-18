import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User1 } from './user1.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User1])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
