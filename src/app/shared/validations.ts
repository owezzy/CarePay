import {Validators} from '@angular/forms';

export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(4),
];

export const RequiredTextValidation = [Validators.required];






