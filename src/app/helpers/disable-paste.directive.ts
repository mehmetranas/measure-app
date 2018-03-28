import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appDisablePaste]'
})
export class DisablePasteDirective {

  constructor() { }
  @HostListener('paste') onPaste(){
    event.preventDefault()
  }
}
