import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateTime'
})
export class CalculateTimePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    const now = new Date();
    const minute = 60 * 1000;
    const diff = Math.floor(now.valueOf() - value);
    const minutes = Math.floor(diff / minute);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 7) {
      return 'Eski';
    } else if (days >= 1 && days <= 7) {
      return `${days} gün`;
    } else if (hours >= 1) {
      return `${hours} saat`;
    } else if (minutes >= 1) {
      return `${minutes} dakika`;
    } else {
      return 'Şimdi';
    }
  }
}
