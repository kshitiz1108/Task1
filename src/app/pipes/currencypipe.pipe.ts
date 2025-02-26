import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencypipe',
  standalone: true
})
export class CurrencypipePipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 100000) {
      return (value / 100000).toFixed(2) + 'M'; 
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'K'; 
    }
    return value.toString(); 
  }
  
}
