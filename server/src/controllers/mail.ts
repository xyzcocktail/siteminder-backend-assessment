import { NextFunction, Request, Response } from 'express';
import HttpResponse from '../interfaces/response';
import MailService from '../services/mailer';

class MailController {

  protected mailService;

  public failOverSendmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    this.mailService = new MailService(req.body);
    try {
      const respData: HttpResponse = await this.mailService.failOverSendmail();

      res.status(200).json({ message: (respData.message || 'Successful'), data: respData.data });
    } catch (error) {
      next(error);
    }
  };

}

export default MailController;
