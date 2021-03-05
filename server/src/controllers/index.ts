import { NextFunction, Request, Response } from 'express';

class IndexController {

  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public ping = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(200).json({ message: 'PONG' });
    } catch (error) {
      next(error);
    }
  };

  public demo = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render('index.html', {});
    } catch (error) {
      next(error);
    }
  };

}

export default IndexController;
