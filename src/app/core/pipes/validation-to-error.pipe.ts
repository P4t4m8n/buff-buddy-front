import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IErrorResponse } from '../types/app.type';

@Pipe({
  name: 'validationToError',
})
export class ValidationToErrorPipe implements PipeTransform {
  transform(
    value: ValidationErrors | null | undefined,
    ...args: unknown[]
  ): IErrorResponse {
    return value as IErrorResponse;
  }
}
