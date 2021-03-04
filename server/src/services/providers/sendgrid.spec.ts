import httpClient from '../httpclients/axios_client';
import SendgridProvider from './sendgrid';

let reqData = {
  to: 'jay.jung@outlook.com',
  cc: 'jayjung+cc1@gmail.com',
  subject: '[SENDGRID] Test email',
  content: 'Email body'
};

let sendgrid: SendgridProvider;
beforeAll(async () => {
  sendgrid = new SendgridProvider(reqData);
});

describe('Implements send email via SendGrid API : ', () => {

  it('Should be contains reqHeaders and postData', () => {
    expect(sendgrid).toHaveProperty('httpClient');
    expect(sendgrid).toHaveProperty('reqHeaders');
    expect(sendgrid).toHaveProperty('postData');
  });

  it('should return 202',  async () => {
    const resp = await sendgrid.sendEmail();
    expect(resp).toHaveProperty('status', 202);
  });

});
