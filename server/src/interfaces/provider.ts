import HttpResponse from './response';

export default interface IProvider {
  setHeaders(): void;
  setParams(): void;
  sendEmail(): Promise<HttpResponse>;
}
