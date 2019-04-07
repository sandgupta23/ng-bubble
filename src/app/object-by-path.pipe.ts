import { Pipe, PipeTransform } from '@angular/core';
import {UtilityService} from './utility.service';

@Pipe({
  name: 'objectByPath'
})
export class ObjectByPathPipe implements PipeTransform {

  transform(obj: object, path: string): any {
    let output;
    try {
      output = UtilityService.getChildObjectByPath(obj, path);
    }catch (e) {
      output = {};
    }
    return output;
  }
}
