import * as util from 'util';
import {Get, Controller, Body, Req, Post, Res} from 'routing-controllers';
import BaseController from './BaseController';
import {
  IGreetingsDTO,
  GreetingsDTO
} from '../../../common/dto/GreetingsDTO';
import CommonRoutes from '../../../common/routes/CommonRoutes';
import GreetingsRoutes from '../../../common/routes/GreetingsRoutes';
import {
  Project
} from 'tts4t';

@Controller(CommonRoutes.api)
export default class GreetingsController extends BaseController {

  constructor() {
    super(__filename);
  }

  @Get(GreetingsRoutes.getHelloWorld)
  getHelloWorld(): string {
    this.logger.debug('getHelloWorld called');
    return 'Hello world!';
  }

  @Post(GreetingsRoutes.postGreetingsViaInterface)
  postGreetingsViaInterface(@Body({required: true}) dto: IGreetingsDTO): string {
    this.logger.debug('getGreetingsViaInterface called');
    return `Hello ${dto.name} ${dto.surname}!`;
  }

  @Post(GreetingsRoutes.postGreetingsViaClass)
  postGreetingsViaClass(@Body({required: true}) dto: GreetingsDTO): string {
    this.logger.debug('getGreetingsViaClass called');
    return `Hello ${dto.getFullName()}!`;
  }

  @Get(GreetingsRoutes.getCheckDecorators)
  async getCheckDecorators(@Req() req: Project.Request, @Res() res: Project.Response): Promise<string> {
    this.logger.debug('getCheckDecorators called');
    this.logger.debug('getCheckDecorators. Response is: ' + util.inspect(res));
    req.some = 'some';
    return `OK! ${req.originalUrl}: ${req.some}!  Response: ${res}`;
  }

  @Get(GreetingsRoutes.getCheckAsyncPromise)
  async getCheckAsyncPromise(@Req() req: Project.Request, @Res() res: Project.Response): Promise<string> {
    this.logger.debug('getCheckAsyncPromise called');
    this.logger.debug('getCheckAsyncPromise. Response is: ' + util.inspect(res));
    req.some = 'some';
    return new Promise<string>(resolve => {
      setTimeout(() => resolve(`OK! ${req.originalUrl}: ${req.some}! Response: ${res}`), 1000);
    });
  }

  @Get(GreetingsRoutes.getCheckDirectPromise)
  getCheckDirectPromise(@Req() req: Project.Request, @Res() res: Project.Response): Promise<string> {
    this.logger.debug('getCheckDirectPromise called');
    this.logger.debug('getCheckDirectPromise. Response is: ' + util.inspect(res));
    req.some = 'some';
    return new Promise(resolve => {
      setTimeout(() => resolve(`OK! ${req.originalUrl}: ${req.some}! Response: ${res}`), 1000);
    });
  }

  @Get(GreetingsRoutes.getTestTypes)
  getTestTypes(@Req() req: Project.Request, @Res() res: Project.Response): Promise<string> {
    this.logger.debug('getTestTypes called');
    this.logger.debug('getTestTypes. Response is: ' + util.inspect(res));

    res.local1 = {name: 'some'};
    this.logger.debug('getTestTypes. Response.local1 is: ' + util.inspect(res.local1));

    return new Promise(resolve => {
      setTimeout(() => resolve(`OK! ${req.originalUrl}: ${req.local}! Response: ${res}`), 1000);
    });
  }

  @Get(GreetingsRoutes.getTestNamespace)
  getTestNamespace(): Promise<string> {
    this.logger.debug('getTestNamespace called');

    const another: Project.Another = {
      bar: 123,
      foo: 'some'
    };

    return new Promise(resolve => {
      setTimeout(() => resolve(`OK! Object: ${util.inspect(another)}`), 1000);
    });
  }

}