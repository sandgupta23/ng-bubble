import {ILineFinderData, INgProbeData} from './interface';
import jsonPrune from 'json-prune';
import {NgBubbleConstant} from './constant';

// declare let ng: any;
export class Helper {
  static camelCaseToDotCase(camel: string) {
    return camel.replace(/[A-Z]/g, m => ' ' + m.toLowerCase());
  }

  static tagToFileName(tag: string, ext: string = '') {
    if (!ext) {
      throw new Error('no extension provided');
    }
    if (!tag) {
      throw new Error('no tagName provided');
    }
    // return tag.replace(COMPONENT_PREFIX, '') + '.component.' + ext;
    return this.removeComponentPrefix(tag) + '.component.' + ext;
  }

  static removeComponentPrefix(tag: string) {
    if (!tag) {
      throw new Error('removeComponentPrefix: no tag in removeComponentPrefix');
    }
    const tagSplits: string[] = tag.split('-');
    tagSplits.shift();
    return tagSplits.join('.');
  }

  static getRootEl(possibleTags: string[]) {
    for (const tag of possibleTags) {
      const elements = document.getElementsByTagName(tag);
      if (elements && elements[0]) {
        return elements[0];
      }
    }
  }


  static getParentComponentNode($node: HTMLElement): HTMLElement {

    let $temp = $node;
    if (!$temp) {
      return;
    }

    do {
      if (Helper.isNodeCustomComponent($temp)) {
        return $temp;
      }
      $temp = $temp.parentElement;
    }
    while (!this.isNodeBody($temp));
    return null;
  }

  private static isNodeBody($node) {
    if (!$node) {
      return false;
    }
    if ($node.tagName.startsWith('BODY') || $node.tagName.startsWith('HTML')) {
      return true;
    }
  }

  private static isNodeCustomComponent($node: HTMLElement) {
    if (!$node) {
      return false;
    }
    if ($node.tagName.startsWith(NgBubbleConstant.LOCAL_CONFIG.angularPrefix.toUpperCase() + '-')) {
      return true;
    }
  }

  public static debounce(func, wait: number, immediate?) {
    let timeout;
    return function() {
      const context = this,
        args = arguments;
      const later = function() {
        timeout = null;
        if ( !immediate ) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait || 200);
      if ( callNow ) {
        func.apply(context, args);
      }
    };
  }


  // static getComponentFromNode($node: HTMLElement){
  //   while (!$node(element.tagName)){
  //     element = element.parentElement;
  //   }
  // }

  static isComponentNode(node$: HTMLElement, component: any) {
    const tagNameSplits: string[] = node$.tagName.split('-');
    tagNameSplits.shift();
    return tagNameSplits.join('').toLowerCase() === component.constructor.name.toLowerCase()
      || tagNameSplits.join('').toLowerCase() + 'component' === component.constructor.name.toLowerCase()
      ;
  }

  /*
   * getComponentDataInstanceFromNode: get parent component of any html element
   * */
  static getComponentDataInstanceFromNode($el: HTMLElement): INgProbeData {
    if (!(<any>window).ng) {
      return;
    }
    const probeData = (<any>window).ng.probe($el);

    if (!probeData) {
      // console.error('NG:BUBBLE::Could not found related component') ;
      return;
    }
    const componentInstance = probeData.componentInstance;

    const componentNode = this.isComponentNode($el, componentInstance) ? $el : probeData.parent && probeData.parent.nativeElement;
    const injector = probeData.injector;
    if (!componentInstance) {
      return null;
    }
    return {
      componentInstance,
      componentNode,
      injector
    };
  }

  static createLineFinderPayload(componentInstance: object, target$) {
    const componentName = componentInstance.constructor.name;
    // let dashNameSplits = dashedName.split(" ");
    let payload: ILineFinderData = {
      // tagName: componentTag,
      searchTerm: componentName,
      file: componentName
    };

    if (target$) {
      payload = {
        ...payload,
        targetTagName: target$.tagName,
        id: target$.id,
        innerText: target$.innerText,
        classList: Array.from(target$.classList),
      };
    }
    return payload;
  }

  /*
    * TODO: implement it later
    * */
  static showBranches(target: HTMLElement) {
    // let parent: HTMLElement | null = target, child: HTMLElement | null = target;
    // while (parent) {
    //   parent = findParentComponentElement(parent, 1);
    //   parent && showComponentMarkerOnComponent(parent);
    // }
  }


  /*
    * stringify1: Partially convert an object to string, on the basis of keys provided
    * obj: object to be stringified
    * keys: keys which are to be stringified
    * */
  static stringify1(obj: object, keys?: string[]) {
    const newObj: any = {};
    const keysToStringify: string[] = (Array.isArray(keys) && keys.length > 0 && keys) || Object.keys(obj);
    keysToStringify.forEach((key) => {
      newObj[key] = obj[key];
    });
    return this.jsonStringifyCyclic(newObj);
  }

  /*
    *getPathTo: get xpath using element
    * https://stackoverflow.com/questions/2631820/how-do-i-ensure-saved-click-coordinates-can-be-reloaed-to-the-same-place-even-i/2631931#2631931
    * */
  static getXPathByElement(element) {


    if (element.id !== '') {
      return 'id("' + element.id + '")';
    }
    if (element === document.body) {
      return element.tagName;
    }

    let ix = 0;
    const siblings = element.parentNode.childNodes;
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (sibling === element) {
        return this.getXPathByElement(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
      }
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
    }
  }

  /**
   * getElementByXpath
   * https://stackoverflow.com/questions/10596417/is-there-a-way-to-get-element-by-xpath-using-javascript-in-selenium-webdriver
   * */
  static getElementByXpath(path) {
    let node: Node;
    try {
      node = document.evaluate('html/' + path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    } catch (e) {

    }
    return node;
  }


  /*
    * hasClass:
    * Check if some html element has a given class
    * */
  static hasClass(element: HTMLElement, thatClass: string): boolean {
    return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + thatClass + ' ') > -1;
  }


  static setState(data: object = {}) {
    const stateStr: any = localStorage.getItem('NG_BUBBLE_STATE');
    const state = JSON.parse(stateStr);
    const x = this.jsonStringifyCyclic({...state, ...data});
    localStorage.setItem('NG_BUBBLE_STATE', x);
  }

  /*
* jsonStringifyCyclic:
* Stringify cyclic JSON
* */
  // function jsonStringifyCyclic(obj):string {
  //   return JSON.stringify(jc.decycle(obj));
  // }

  static jsonStringifyCyclic(obj) {
    /*TODO: move to web worker*/
    // return  JSON.stringify(jc.decycle(obj));

    let output;
    try {
      output = jsonPrune(obj, 5);
    } catch (e) {
      output = {};

    }
    return output;
  }

  static removeChildFromParent($el: HTMLElement) {
    const parent = $el.parentElement;
    // if(parent) parent.removeChild($el);
  }

  static removeChildrenWithClassName(className: string) {
    const elements = Array.from(document.getElementsByClassName(className));
    elements.forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  }
}
