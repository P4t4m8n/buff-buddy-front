import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray',
})
export class ObjectToArrayPipe implements PipeTransform {
  transform<V>(value: Record<string, V> | null | undefined): (V & {
    key: string;
  })[] {
    if (!value) {
      return [];
    }

    return Object.entries(value).map(([entryKey, entryValue]) => {
      return {
        ...entryValue,
        key: entryKey,
      };
    });
  }
}
