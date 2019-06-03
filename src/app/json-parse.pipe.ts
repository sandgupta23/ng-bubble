import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'jsonParse'
})
export class JsonParsePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let val;
    try {
      val = JSON.parse(value);

    } catch (e) {
      // console.error(e);
    }
    return val;

  }

}
