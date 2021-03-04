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

describe('Sends emails: ', () => {
  describe('Fail over send email ', () => {
    it('Should return 200 and message', async () => {
      const resp = await request(app.getServer()).post('/api/mail/send').send(reqData);
      expect(resp.status).toEqual(200);
      expect(resp.body).toHaveProperty('message');
    });
  });
});
