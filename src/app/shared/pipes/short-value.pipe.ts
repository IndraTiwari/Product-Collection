import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortValue'
})
export class ShortValuePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
