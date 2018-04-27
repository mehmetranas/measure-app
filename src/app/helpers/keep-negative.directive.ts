import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appKeepNegative]'
})
export class KeepNegativeDirective {
  constructor(private el: ElementRef) { }

  @HostListener('keypress') onKeyPress() {
    if (event['keyCode'] === 45) {
      return false;
    }
  }
}
