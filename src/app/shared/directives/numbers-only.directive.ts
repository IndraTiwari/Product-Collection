import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  constructor() { }
  codeValue: string[] = ['13', '39', '37', '8', '46', '38', '40', '9'];
  onlyNumber = /^\d+$/;
  @HostListener('keydown', ['$event']) onEvent(event: KeyboardEvent) {
    if (
      event.key &&
      event.keyCode &&
      this.codeValue.indexOf(event.keyCode.toString()) == -1 &&
      this.onlyNumber.test(event.key) === false
    ) {
      event.preventDefault();
    }
  }
}
