import { Injectable } from '@angular/core';
import {locations} from './location.enum';

@Injectable()
export class LocationService {
  private locations = [
    {value: locations.NONE, viewValue: 'Seç'},
    {value: locations.SALOON, viewValue: 'Salon'},
    {value: locations.BEDROOM, viewValue: 'Yatak Odası'},
    {value: locations.LIVING_ROOM, viewValue: 'Oturma Odası'},
    {value: locations.KID_ROOM, viewValue: 'Çocuk Odası'},
    {value: locations.WORKING_ROOM, viewValue: 'Çalışma Odası'},
    {value: locations.KITCHEEN, viewValue: 'Mutfak'},
    {value: locations.GARRET, viewValue: 'Çatı Katı'},
    {value: locations.BALCONY, viewValue: 'Balkon'},
    {value: locations.FREE_ROOM1, viewValue: 'Boş Oda 1'},
    {value: locations.FREE_ROOM2, viewValue: 'Boş Oda 2'},
    {value: locations.FREE_ROOM3, viewValue: 'Boş Oda 3'},
    {value: locations.FREE_ROOM4, viewValue: 'Boş Oda 4'}
  ];

  constructor() { }

  public get(){
    return this.locations;
  }

}

