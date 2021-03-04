import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { validateEmails } from '../utils/util';

@ValidatorConstraint({ name: 'IsEmails', async: false })
export class IsEmails implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return validateEmails(text);
  }
}
