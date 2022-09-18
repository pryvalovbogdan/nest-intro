import { lastValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';

import { CatsController } from '../cats.controller';
import { CatsService } from '../cats.service';
import { Request } from 'express';

describe('Cats controller', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  let httpService: HttpService;
  let request: Request;

  beforeEach(() => {
    catsService = new CatsService();
    httpService = new HttpService();
    catsController = new CatsController(catsService, httpService);
  });

  describe('findCats', () => {
    it('should return array of cats', async () => {
      const result = [{ name: 'fluffy', age: 1, breed: 'orange' }];

      lastValueFrom(await catsController.findCats(request)).then(value => {
        expect(value).toBe(result);
      });
    });
  });
});
