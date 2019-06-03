import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SortObject'
})
export class SortObjectPipe implements PipeTransform {

  transform(o: object, path?: any): any {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
  }

}
