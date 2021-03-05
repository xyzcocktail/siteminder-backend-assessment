import { configs } from '../configs/config';
import { logger } from "../utils/logger";
import MailBody from '../interfaces/mailbody';
import Sendgrid from "./providers/sendgrid";
import Mailgun from "./providers/mailgun";

export default class MailService {
  private mailProviders = [];
  reTry: number;

  constructor(reqBody: MailBody) {
    this.reTry = configs.FAILOVER.RE_TRY;
    const mailgunProvider = new Mailgun(reqBody);
    const sendgridProvider = new Sendgrid(reqBody);
    this.setProviders([mailgunProvider, sendgridProvider]);
  }

  public setProviders(providers: Array<any>) {
    this.mailProviders = [];
    providers.forEach(provider => {
      this.mailProviders.push(provider);
    });
  }

  public async failOverSendmail(): Promise<any> {
    for(let i = 0; i < this.reTry; i++) {
      for(let idx = 0; idx < this.mailProviders.length; idx++) {
        const mailer = this.mailProviders[idx];
        logger.info(`current [${i + 1}], mailer [${mailer.providerName}]`);
        try {
          return await mailer.sendEmail();
        } catch (err) {
          configs.DEBUG && console.info('** failOverSendmail [err] ', err);
        }
      }
    }
  }
}
