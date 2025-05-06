import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeKeys',
  standalone: true,
})
export class RemoveKeysPipe implements PipeTransform {

  transform<T extends Record<string, any>, K extends keyof T>(
    value: T | null | undefined,
    keysToRemove: K | K[]
  ): Omit<T, K> {
    if (!value) {
      return value as any;
    }

    const keys = Array.isArray(keysToRemove) ? keysToRemove : [keysToRemove];

    const result = { ...value };

    keys.forEach((key) => {
      if (key in result) {
        delete result[key];
      }
    });

    return result as Omit<T, K>;
  }
}
