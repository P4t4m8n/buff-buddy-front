import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FirstCharToLowerCase } from '../functions/FirstCharToLowerCase';

@Injectable({
  providedIn: 'root',
})
export class HandleServerFormErrorService {
  mapErrorsToForm<T>(form: FormGroup, errorResponse: any): void {
    if (!errorResponse?.error?.errors) {
      return;
    }


    const errors = Object.entries(errorResponse.error.errors).map(
      ([key, value]) => {
        if (key === 'ImgUrl') {
          key = 'file';
        }

        return {
          key: FirstCharToLowerCase(key) as keyof T,
          error: (value as string[]).join(', '),
        };
      }
    );

    errors.forEach((error) => {
      const key = String(error.key);
      if (form.controls[key]) {
        form.controls[key].setErrors({
          serverError: error.error,
        });
      }
    });
  }
}
