import * as request from 'supertest';
import App from '../src/app';
import MailRoute from '../src/routes/mail';

let app: App;

beforeAll(async () => {
  const mailRoute = new MailRoute();
  app = new App([mailRoute]);
});

let reqData = {
  to: 'jay.jung@outlook.com',
  subject: '[FAILOVER] TEST EMAIL',
  content: 'EMAIL BODY'
};

describe('Testing Mail APIs: ', () => {

  describe('[POST] /api/mail/send ', () => {
    it('Should return 200 with message', async () => {
      const resp = await request(app.getServer()).post('/api/mail/send').send(reqData);
      expect(resp.status).toEqual(200);
      expect(resp.body).toHaveProperty('message');
    });
  });

});
