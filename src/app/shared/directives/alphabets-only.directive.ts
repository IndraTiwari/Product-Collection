import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[alphabetsOnly]'
})
export class AlphabetsOnlyDirective {

  constructor() { }
  codeValue: string[] = ['13', '39', '37', '8', '46', '38', '40', '9'];
  onlyNumber = /^[A-Za-z]+$/;
  @HostListener('keydown', ['$event']) onEvent(event: KeyboardEvent) {
    if (
      event.key &&
      event.keyCode &&
      // this.codeValue.indexOf(event.keyCode.toString()) == -1 &&
      this.onlyNumber.test(event.key) === false
    ) {
      event.preventDefault();
    }
  }
}
