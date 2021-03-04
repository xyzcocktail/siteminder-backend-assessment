import ReqHeaders from '../../interfaces/req_headers';
import MailBody from '../../interfaces/mailbody';

export default class BaseProvider {
  protected providerName: string;
  protected httpClient: any;
  protected reqHeaders: ReqHeaders;
  protected reqParams: MailBody;
  protected postData: any;

  constructor(reqParams: MailBody) {
    this.reqParams = reqParams;
  }
}
