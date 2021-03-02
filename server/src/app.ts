// import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';
import Routes from './interfaces/routes';
import errorMiddleware from './middlewares/error';
import { logger, stream } from './utils/logger';
import { configs } from './configs/config';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app  = express();
    this.port = 8080;
    this.env  = 'development';

    this.initConfigs();
    this.initMiddlewares();
    this.initRoutes(routes);
    this.initErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  private initConfigs() {
    if (!configs.PORT) {
      console.error('Please check your .env file!');
      process.exit();
    }
    this.port = configs.PORT;
    this.env  = configs.NODE_ENV;
  }

  private initMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: 'siteminder.com', credentials: true }));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
