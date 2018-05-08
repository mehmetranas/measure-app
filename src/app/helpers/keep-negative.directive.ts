import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appKeepNegative]'
})
export class KeepNegativeDirective {
  constructor() { }

  @HostListener('keypress') onKeyPress() {
    if (event['keyCode'] === 45) {
      return false;
    }
  }
}
