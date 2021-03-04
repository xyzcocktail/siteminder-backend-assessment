export default interface IMailBody {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  content: string;
}
