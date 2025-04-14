import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function YoutubeLinkValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const youtubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const isValidYoutubeUrl = youtubeUrlPattern.test(control.value);

    return isValidYoutubeUrl ? null : { invalidYoutubeLink: true };
  };
}
