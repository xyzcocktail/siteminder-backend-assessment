import 'dotenv/config';
import * as request from 'supertest';
import App from '../src/app';
import IndexRoute from '../src/routes/index';

let app: App;

beforeAll(async () => {
  const indexRoute = new IndexRoute();
  app = new App([indexRoute]);
});

describe('Testing Index Controller: ', () => {

  describe('[GET] /', () => {
    test('should return 200', async () => {
      return request(app.getServer()).get('/').expect(200);
    });
  });

  describe('[GET] /ping', () => {
    test('should return 200 with response message PONG', async () => {
      return request(app.getServer()).get('/ping').then(resp => {
        const result = JSON.parse(resp.text);
        expect(result).toHaveProperty('message', 'PONG');
      });
    });
  });

});
