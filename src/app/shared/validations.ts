import {Validators} from '@angular/forms';
// simple validators for user input
export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [Validators.required, Validators.minLength(4)];





