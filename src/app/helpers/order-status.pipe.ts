import { Pipe, PipeTransform } from '@angular/core';
import {orderStatus} from './helper';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   let result = {value:null,viewValue:'',message:''};
    orderStatus.forEach((os:any) => {
      if(os.value === value) result = os;
    });
    return result;
  }

}
