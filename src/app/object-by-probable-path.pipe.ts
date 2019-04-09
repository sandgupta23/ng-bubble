import { Pipe, PipeTransform } from '@angular/core';
import {tap} from 'rxjs/operators';

@Pipe({
  name: 'objectByProbablePath'
})
export class ObjectByProbablePathPipe implements PipeTransform {

  transform(object: object, path?: any): any {
    debugger;
    if(!path || !path.trim()){
      return object;
    }
    // let paths = path.trim().split('.');
    let x = this.getSubObjectWithMatchedkey(object, path);

    let obj = {};
    // let x = paths.reduce((total, path)=>{
    //   let subTree = this.getSubObjectWithMatchedkey(total,path);
    //   return {
    //     ...total,
    //     ...subTree
    //   }
    // },object);
    return x;
  }

  getSubObjectWithMatchedkey(object, key){
    return Object.keys(object).reduce((total:object, currentKey)=>{
      if(currentKey.toLowerCase().includes(key.toLowerCase())){
        total = {
          ...total,
          [currentKey]:object[currentKey]
        };
      }
      return total
    },{});
  }

}
