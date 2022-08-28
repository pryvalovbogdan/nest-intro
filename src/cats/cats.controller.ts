import {
  Controller,
  Get,
  Res,
  HttpCode,
  Req,
  Header,
  Redirect,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { ICat } from './iterfaces/cats.interface';

/**  Prefix in brackets going to produce a route mapping for requests like GET http://localhost:3000/cats **/

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  /** To change response status we can use HttpCode **/
  @Get()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  findCats(@Req() request: Request): Observable<ICat[]> {
    return of(this.catsService.findAll());
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {}

  /** Other way to get params with Param decorator **/
  @Get(':count')
  /**
   * Pipes have two typical use cases:
   *     transformation: transform input data to the desired form (e.g., from string to integer)
   *     validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect
   */
  findExactCat(@Param('count', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) count, @Res() response) {
    if (count === 1) {
      throw new HttpException('There could not be only 1 cat', HttpStatus.BAD_REQUEST);
    }
    /** To change response status we can express build in res decorator **/
    response.status(200).send(`${count} cat`);
  }

  @Get(':count')
  findCat(@Req() request: Request, @Res() response) {
    /** To throw default error use HttpException **/
    if (request.params.count === '1') {
      throw new HttpException('There could not be only 1 cat', HttpStatus.BAD_REQUEST);
    }
    /** To change response status we can express build in res decorator **/
    response.status(200).send(`${request.params.count} cat`);
  }

  @Post()
  @HttpCode(204)
  async createCat(@Body() createCatDto: CreateCatDto): Promise<string> {
    this.catsService.create(createCatDto);

    return 'cat have been created';
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  /** The second way of manipulating the response is to use a library-specific response object. **/
  @Post('withExpress')
  create(@Res() response: Response) {
    response.status(HttpStatus.CREATED).send();
  }

  @Get('withExpress')
  getWithExpress(@Res() response: Response) {
    response.status(HttpStatus.OK).json([]);
  }
}
