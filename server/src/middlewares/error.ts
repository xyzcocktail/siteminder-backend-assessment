import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http_exception';
import { logger } from '../utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`StatusCode : ${status}, Message : ${message}`);
    res.status(status).json({ status, message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
