import { ValidationErrors } from '@angular/forms';

export interface IEntity {
  id: string;
}
export interface IEntityDTO {
  id?: string;
}

export interface IErrorMessage<T> {
  key: keyof T;
  error: IErrorResponse;
}

export interface IErrorResponse extends ValidationErrors {
  minlength?: ILengthError | undefined;
  maxlength?: ILengthError | undefined;
  pattern?: IPatternError | undefined;
  required?: boolean | undefined;
  invalidYoutubeLink?: boolean | undefined;
  serverError?: string | undefined;
}

export interface ILengthError {
  actualLength: number;
  requiredLength: number;
}

export interface IPatternError {
  actualValue: string;
  requiredPattern: string;
}

export const DAY_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;
export type TDayOfWeek = (typeof DAY_OF_WEEK)[number];
