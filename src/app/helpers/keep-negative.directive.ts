import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appKeepNegative]'
})
export class KeepNegativeDirective {
  constructor(private el: ElementRef) { }

  @HostListener("keypress") onKeyPress(){
    if(event['keyCode'] === 45) {
      return false;
    }
  }
}
