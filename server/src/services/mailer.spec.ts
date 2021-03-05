import Mailer from './mailer';
import Mailgun from "./providers/mailgun";
import Sendgrid from "./providers/sendgrid";

const reqData = {
  to: 'jay.jung@outlook.com',
  subject: '[MAILER] Test email',
  content: 'Email body',
};
const mailgunProvider = new Mailgun(reqData);
const mailgunProviderFail = new Mailgun(reqData);
const sendgridProvider = new Sendgrid(reqData);
const sendgridProviderFail = new Sendgrid(reqData);

let mailer: Mailer;
beforeAll(async () => {
  mailer = new Mailer(reqData);
});

describe('if one of the service goes down, will failover to the other provider : ', () => {

  describe('Should send email via SendgridProvider if mailgun service down', () => {
    it('Should return 200',  async () => {

    });
  });

  describe('Should send email via MailgunProvider if sendgrid service down', () => {
    it('Should return 200',  async () => {

    });
  });

});
