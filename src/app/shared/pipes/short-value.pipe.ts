import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortValue'
})
export class ShortValuePipe implements PipeTransform {

  constructor(private _decimalPipe: DecimalPipe) {}
  transform(number: number, args?: any): any {
    if (isNaN(number)) return null;
    if (number === null) return null;
    if (number === 0) return null;
    let displayValue = Math.abs(number);
    if (displayValue < 1000) {
      return this._decimalPipe.transform(displayValue, '0.2-2');
    }
    const isNegative = number < 0; // will also work for Negetive numbers
    let key = '';

    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'K', value: 1000 },
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = +displayValue / powers[i].value;
      // reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        displayValue = +this._decimalPipe.transform(reduced, '0.2-2');
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + displayValue + key;
  }
}
