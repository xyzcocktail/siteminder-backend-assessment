import { Router } from 'express';
import IndexController from '../controllers/index';
import Route from '../interfaces/routes';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}ping`, this.indexController.ping);
  }
}

export default IndexRoute;
