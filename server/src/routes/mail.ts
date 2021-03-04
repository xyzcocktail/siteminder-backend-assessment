import { Router } from 'express';
import validationMiddleware from '../middlewares/validation';
import Route from '../interfaces/routes';
import MailController from '../controllers/mail';
import MailBody from '../schemas/mail_body';

class MailRoute implements Route {
  public path = '/api/mail';
  public router = Router();
  public mailController = new MailController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/send`,
      validationMiddleware(MailBody, 'body', true),
      this.mailController.failOverSendmail
    );
  }
}

export default MailRoute;
