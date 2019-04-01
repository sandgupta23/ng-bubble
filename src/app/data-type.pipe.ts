import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataType'
})
export class DataTypePipe implements PipeTransform {

  transform(value: any): string {
    return typeof value;
  }

}
