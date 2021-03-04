import { configs } from '../../configs/config';
import BaseProvider from './base_provider';
import Provider from '../../interfaces/provider';
import MailBody from '../../interfaces/mailbody';
import httpClient from '../httpclients/axios_client';
import HttpException from '../../utils/http_exception';
import HttpResponse from '../../interfaces/response';

export default class SendgridProvider extends BaseProvider implements Provider {

  constructor(reqParams: MailBody) {
    super(reqParams);
    this.providerName = 'Sendgrid';
    this.setHeaders();
    this.setParams();
    this.httpClient = new httpClient(configs.SENDGRID.BASE_URL, this.reqHeaders);
  }

  public setHeaders(): void {
    this.reqHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${configs.SENDGRID.API_KEY}`
    }
  }

  public setParams(): void {
    const recipientTo = this.reqParams.to.split(',').map(email => { return { email } });
    const recipientCc = (this.reqParams.cc)
      ? this.reqParams.cc.split(',').map(email => { return { email } })
      : null;
    const recipientBcc = (this.reqParams.bcc)
      ? this.reqParams.bcc.split(',').map(email => { return { email } })
      : null;
    this.postData = {
      from: { email: configs.SENDGRID.FROM_EMAIL },
      personalizations: [{
        to: recipientTo,
        cc: recipientCc,
        bcc: recipientBcc,
      }],
      subject: this.reqParams.subject,
      content: [{ type: 'text/plain', value: this.reqParams.content }],
    };
  };

  public async sendEmail(): Promise<HttpResponse> {
    configs.DEBUG && console.info('** sendEmail [postData] ', this.postData);
    try {
      const response = await this.httpClient.post('mail/send', this.postData);
      configs.DEBUG && console.info('** response ', response);
      if (response.status === 200 || response.status === 202) {
        response.data = { providerName: this.providerName };
        response.message = 'Email has been sent successfully!';
        return response;
      } else {
        throw new HttpException(500, 'Oops! Something went wrong');
      }
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  }
}
