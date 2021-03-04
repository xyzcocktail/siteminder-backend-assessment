import httpClient from '../httpclients/axios_client';
import MailgunProvider from './mailgun';

let reqData = {
  to: 'jay.jung@outlook.com, jay.jung@icloud.com',
  cc: 'jayjung+cc1@ezion.com.au, jayjung+cc2@gmail.com',
  subject: '[MAILGUN] Test multiple email',
  content: 'Email body'
};

let mailgun: MailgunProvider;
beforeAll(async () => {
  mailgun = new MailgunProvider(reqData);
});

describe('Implements send email via Mailgun API : ', () => {

  it('Should be contains reqHeaders and postData', () => {
    expect(mailgun).toHaveProperty('httpClient');
    expect(mailgun).toHaveProperty('reqHeaders');
    expect(mailgun).toHaveProperty('postData');
  });

  it('Should return 200 with message',  async () => {
    const resp = await mailgun.sendEmail();
    expect(resp).toHaveProperty('status', 200);
    expect(resp).toHaveProperty('message', 'Queued. Thank you.');
  });

});
