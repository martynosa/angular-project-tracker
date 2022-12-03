import { FormGroup, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  password: string,
  rePassword: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const passwordControl = group.get(password);
    const rePasswordControl = group.get(rePassword);
    return passwordControl?.value === rePasswordControl?.value
      ? null
      : { matchPassword: true };
  };
}
