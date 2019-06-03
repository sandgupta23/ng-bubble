import { Pipe, PipeTransform } from '@angular/core';
import {tap} from 'rxjs/operators';

@Pipe({
  name: 'objectByProbablePath'
})
export class ObjectByProbablePathPipe implements PipeTransform {

  transform(object: object, path?: any): any {
    if (!path || !path.trim()) {
      return object;
    }
    // let paths = path.trim().split('.');
    const x = this.getParts(object, path);

    const obj = {};
    // let x = paths.reduce((total, path)=>{
    //   let subTree = this.getSubObjectWithMatchedkey(total,path);
    //   return {
    //     ...total,
    //     ...subTree
    //   }
    // },object);
    return x;
  }

  getSubObjectWithMatchedkey(object, key) {
    return Object.keys(object).reduce((total: object, currentKey) => {
      if (currentKey.toLowerCase().includes(key.toLowerCase())) {
        total = {
          ...total,
          [currentKey]: object[currentKey]
        };
      }
      return total;
    }, {});
  }

  getParts(object, fragments) {
    const [part, ...rest] = fragments.split('.');

    return Object.assign({}, ...Object
      .entries(object)
      .filter(([key]) => key.toLowerCase().includes(part.toLowerCase()))
      .map(([k, v]) => {
        if (!rest.length) { return { [k]: v }; }
        const parts = v && typeof v === 'object' && this.getParts(v, rest.join('.'));
        if (parts) { return { [k]: parts }; }
      })
    );
  }

}
