import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { catchError, map, of } from 'rxjs';


export class CustomValidators {
    static userExistsValidator(authService: AuthService): AsyncValidatorFn {
        return (control: AbstractControl) => {
            const username = control.value;
            if (username) {
              return authService.usernameIsExsits(username).pipe(
                map((response) => {
                  const userExists = response.body;
                  const status = response.status;
                  return status === 200 && userExists ? { userExsits: true } : null;
                }),
                catchError(() => of(null))
              );
            } else {
              return of(null);
            }
          };
    }
  }