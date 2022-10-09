import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Get(':id')
  public getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser({ id });
  }

  @Post('register')
  public async createUser(@Body() body: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await this.service.createUser({ ...body, password: hashedPassword });

    delete user.password;

    return user;
  }

  @Post('login')
  public async login(@Body() body: LoginUserDto, @Res() response: Response) {
    const user: User = await this.service.getUser({ email: body.email });

    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = this.jwtService.sign({ id: user.id });

    response.cookie('jwt', jwt);

    response.status(201).send({ message: 'success' });
  }

  @Get()
  public async getUser(@Req() request: Request, @Res() response: Response) {
    try {
      const data = await this.jwtService.verifyAsync(request.cookies['jwt']);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.service.getUser({ id: data.id });

      delete user.password;

      response.status(200).send(user);
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException(e);
    }
  }

  @Post('logout')
  public logout(@Res() response: Response) {
    response.clearCookie('jwt');
    response.status(200).send({ message: 'success' });
  }
}
