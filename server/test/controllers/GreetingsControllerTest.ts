import * as express from 'express';
import {assert} from 'chai';
import * as supertest from 'supertest-as-promised';
import WebServer from '../../app/web-server';
import CommonRoutes from '../../../common/routes/CommonRoutes';
import GreetingsRoutes from '../../../common/routes/GreetingsRoutes';

describe('GreetingControllerTest', () => {

  let testApplication: express.Express;

  before('start test application', () => {
    testApplication = WebServer.createWebServer();
  });

  after('stop test application', () => {
  });

  it(`test for ${GreetingsRoutes.getHelloWorld}`, async() => {
    await supertest(testApplication)
      .get(CommonRoutes.api + GreetingsRoutes.getHelloWorld)
      .expect(200, 'Hello world!');

  });

  it(`test for ${GreetingsRoutes.getPromiseRejection}`, async() => {
    await supertest(testApplication)
      .get(CommonRoutes.api + GreetingsRoutes.getPromiseRejection)
      .expect(500, 'Rejected promise');
  });

  it(`test for ${GreetingsRoutes.getErrorThrown}`, async() => {
    await supertest(testApplication)
      .get(CommonRoutes.api + GreetingsRoutes.getErrorThrown)
      .expect((res: supertest.Response) => {
        assert.equal(res.status, 500);
        assert.isObject(res.body);
        assert.deepEqual(res.body, {});
      });
  });

});

