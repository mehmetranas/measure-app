import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if(!value || value.length === 0) return null;
    if(value && value.length >10) return value.substr(0,10);
    let result:string = '(';
    for(let i = 0; i<value.length; i++){
      result += value[i];
      if(i === 2)
        result += ') ';
      if(i === 5)
        result += '-';
    }

    return result;
  }

}
