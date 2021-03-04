import { Validate, IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmails } from '../middlewares/custom_validation';

export default class MailBody {
  @IsNotEmpty()
  @Validate(IsEmails)
  to: string;

  @Validate(IsEmails)
  cc?: string;

  @Validate(IsEmails)
  bcc?: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  content: string;
}
