import {environment} from '../../environments/environment';

export class LoggingService {

  /*log:
  * Logs a given item, if in dev mode
  * */
  static log(item){
    if(!environment.production){
      console.log(item);
    }
  }
}