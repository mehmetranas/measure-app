import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value){
      case 'r0':
        return 'Super';
      case 'r1':
        return 'Yönetici';
      case 'r2':
        return 'Çalışan';
      case 'r3':
        return 'Terzi';
    }
    return 'Tanımsız';
  }

}
