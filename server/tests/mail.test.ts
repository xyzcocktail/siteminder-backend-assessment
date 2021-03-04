import 'dotenv/config';
import * as request from 'supertest';
import App from '../src/app';
import MailRoute from '../src/routes/mail';

let app: App;

beforeAll(async () => {
  const mailRoute = new MailRoute();
  app = new App([mailRoute]);
});

// afterAll(async () => {
//   await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
// });

describe('Create a service that accepts the necessary information and sends emails: ', () => {
  describe('[GET] /', () => {
    it('should return 200', async () => {
      return request(app.getServer()).get('/').expect(200);
    });
  });
});
