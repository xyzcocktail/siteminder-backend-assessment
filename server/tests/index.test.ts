import 'dotenv/config';
import * as request from 'supertest';
import App from '../src/app';
import IndexRoute from '../src/routes/index';

let app: App;

beforeAll(async () => {
  const indexRoute = new IndexRoute();
  app = new App([indexRoute]);
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Testing Index: ', () => {

  describe('[GET] /', () => {
    test('should return 200', async () => {
      return request(app.getServer()).get('/').expect(200);
    });
  });

  describe('[GET] /ping', () => {
    test('should return 200 with response message pong', async () => {
      return request(app.getServer()).get('/ping').then(resp => {
        const result = JSON.parse(resp.text);
        expect(result).toHaveProperty('message', 'PONG');
      });
    });
  });

});
