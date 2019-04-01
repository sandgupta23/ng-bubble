import { Pipe, PipeTransform } from '@angular/core';
import {UtilityService} from './utility.service';

@Pipe({
  name: 'objectByPath'
})
export class ObjectByPathPipe implements PipeTransform {

  transform(obj: object, path: string): any {

    return UtilityService.getChildObjectByPath(obj, path);
  }
}
