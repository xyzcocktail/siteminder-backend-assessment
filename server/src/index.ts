import App from './app';
import IndexRoute from './routes/index';

const app = new App([
  new IndexRoute(),
]);

app.listen();
