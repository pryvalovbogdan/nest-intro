import { Injectable } from '@nestjs/common';
import { ICat } from './iterfaces/cats.interface';

// To create a service using the CLI, simply execute the $ npx @nestjs/cli g service cats command.
@Injectable()
export class CatsService {
  private readonly cats: ICat[] = [{ name: 'fluffy', age: 1, breed: 'orange' }];

  create(cat: ICat) {
    this.cats.push(cat);
  }

  findAll(): ICat[] {
    return this.cats;
  }
}
