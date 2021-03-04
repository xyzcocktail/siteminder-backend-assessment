import App from './app';
import IndexRoute from './routes/index';
import MailRoute from './routes/mail';

const app = new App([
  new IndexRoute(),
  new MailRoute(),
]);

app.listen();
