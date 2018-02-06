import { Injectable } from '@angular/core';

@Injectable()
export class StepperService {

  public step = 0;

  constructor() { }

  public next(){
    return this.step  += 1;
  }

  public previous() {
    return this.step -= 1;
  }

}
