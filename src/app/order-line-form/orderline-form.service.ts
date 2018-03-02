import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class OrderlineFormService {
  public orderlineFormState: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
