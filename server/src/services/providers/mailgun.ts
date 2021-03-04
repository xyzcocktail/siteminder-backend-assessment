import { configs } from '../../configs/config';
import BaseProvider from './base_provider';
import Provider from '../../interfaces/provider';
import MailBody from '../../interfaces/mailbody';
import httpClient from '../httpclients/axios_client';
import HttpException from '../../utils/http_exception';
import HttpResponse from '../../interfaces/response';

export default class MailgunProvider extends BaseProvider implements Provider {

  constructor(reqParams: MailBody) {
    super(reqParams);
    this.providerName = 'Mailgun';
    this.setHeaders();
    this.setParams();
    this.httpClient = new httpClient(configs.MAILGUN.BASE_URL, this.reqHeaders);
  }

  public setHeaders(): void {
    const authKey = Buffer.from(`api:${configs.MAILGUN.API_KEY}`).toString('base64');
    this.reqHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authKey}`
    }
  }

  public setParams(): void {
    const formData = new URLSearchParams();
    formData.append('from', configs.MAILGUN.FROM_EMAIL);
    formData.append('to', this.reqParams.to);
    this.reqParams.cc && formData.append('cc', this.reqParams.cc);
    this.reqParams.bcc && formData.append('bcc', this.reqParams.bcc);
    formData.append('subject', this.reqParams.subject);
    formData.append('text', this.reqParams.content);
    this.postData = formData;
  };

  public async sendEmail(): Promise<HttpResponse> {
    configs.DEBUG && console.info('** sendEmail [postData] ', this.postData);
    try {
      const response = await this.httpClient.post('messages', this.postData);
      configs.DEBUG && console.info('** response ', response);
      if (response.status === 200) {
        response.data = { providerName: this.providerName };
        return response;
      } else {
        throw new HttpException(500, 'Oops! Something went wrong');
      }
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  }
}
