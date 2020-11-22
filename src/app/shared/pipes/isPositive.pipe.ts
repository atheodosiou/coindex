import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isPositive'
})
export class IsPositivePipe implements PipeTransform {

  transform(value: number): boolean {
    return value > 0 ? true : false;
  }

}
