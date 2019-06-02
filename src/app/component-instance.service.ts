import {Injectable} from '@angular/core';

declare const Reflect: any;

/*
* CREDITS:
* Taken from: Augury project https://github.com/rangle/augury/blob/master/src/tree/transformer.ts
* */
@Injectable()
export class ComponentInstanceService {
  private static injectedParameterDecorators(instance) {
    let x=  Reflect.getOwnMetadata('parameters', instance.constructor)
      || instance.constructor.__parameters__
      || instance.constructor.__paramaters__; // angular 5.1 has a typo
    return x;
  }

  private static parameterTypes(instance): Array<any> {
    let x =  (Reflect.getOwnMetadata('design:paramtypes', instance.constructor) || [])
      .map(param => typeof param !== 'function' || param.name === 'Object' ? null : param);
    return x;
  };

  public static getDependencies(instance) {
    const parameterDecorators = this.injectedParameterDecorators(instance) || [];
    const normalizedParamTypes = this.parameterTypes(instance)
      .map((type, i) => type ?
        type
        : Array.isArray(parameterDecorators[i]) ?
          (() => {
            const decoratorToken = parameterDecorators[i].find(item => item.token !== undefined);
            return decoratorToken ? decoratorToken.token : 'unknown';
          })()
          : 'unknown'
      );

    let x = normalizedParamTypes
      .filter(paramType => typeof paramType === 'function')
      .map((paramType, i) => ({
        name: this.functionName(paramType) || paramType.toString(),
        decorators: parameterDecorators[i] ? parameterDecorators[i].map(d => d.toString()) : [],
      }));
    return x;
  };

  private static functionName(fn: Function): string {
    const extract = (value: string) => value.match(/^function ([^\(]*)\(/);

    let name: string = (<any>fn).name;
    if (!name || name.length === 0) {
      const match = extract(fn.toString());
      if (match != null && match.length > 1) {
        name = match[1];
      }
    }

    if (typeof name !== 'string' || name === '') {
      name = 'anonymous';
    }

    name = name.replace(/[^\w]/gi, '_');

    if (!isNaN(parseInt(name[0], 10))) {
      name = '__num_' + name[0];
    }

    return name;
  };
}