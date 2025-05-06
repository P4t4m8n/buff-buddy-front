import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IErrorResponse } from '../types/app.type';

@Pipe({
  name: 'errorParsing',
})
export class ErrorParsingPipe implements PipeTransform {
  transform(value: IErrorResponse, ...args: unknown[]): unknown {
    if (value.required) {
      return 'Required';
    }

    if (value.maxlength) {
      return `Max length is ${value.maxlength.requiredLength} (actual: ${value.maxlength.actualLength})`;
    }

    if (value.minlength) {
      return `Min length is ${value.minlength.requiredLength} (actual: ${value.minlength.actualLength})`;
    }

    if (value.pattern) {
      return 'Invalid format';
    }

    if (value.invalidYoutubeLink) {
      return 'Invalid youtube link';
    }

    if (value.serverError) {
      return value.serverError;
    }

    return '';
  }
}
