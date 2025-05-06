import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setToDto'
})
export class SetToDtoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
