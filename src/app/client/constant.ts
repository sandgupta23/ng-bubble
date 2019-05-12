import {ILocalConfig} from '../interface';

export class NgBubbleConstant {
  static LOCAL_CONFIG: ILocalConfig = { /*backend configurations selection made by user with ng-bubble command*/
    ctrl: false,
    preferredIde: 'WEBSTORM',
    guess: false,
    inputTaken: false,
    componentSelector: 'app',
    angularPrefix: 'app',

  };

  static readonly possibleRootTags = ['my-app', 'app-root', 'root'];
}