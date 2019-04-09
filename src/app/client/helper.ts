import {ILineFinderData, INgProbeData} from './interface';
import jsonPrune from 'json-prune';
// declare let ng: any;
export class Helper {
  static camelCaseToDotCase(camel: string) {
    return camel.replace(/[A-Z]/g, m => ' ' + m.toLowerCase());
  }

  static tagToFileName(tag: string, ext: string = '') {
    if (!ext) {
      throw 'no extension provided';
    }
    if (!tag) {
      throw 'no tagName provided';
    }
    // return tag.replace(COMPONENT_PREFIX, '') + '.component.' + ext;
    return this.removeComponentPrefix(tag) + '.component.' + ext;
  }

  static removeComponentPrefix(tag: string) {
    if (!tag) throw 'removeComponentPrefix: no tag in removeComponentPrefix';
    let tagSplits: string[] = tag.split('-');
    tagSplits.shift();
    return tagSplits.join('.');
  }

  static getRootEl(possibleTags: string[]) {
    for (let tag of possibleTags) {
      let elements = document.getElementsByTagName(tag);
      if (elements && elements[0]) {
        return elements[0];
      }
    }
  }

  /*
   * getComponentDataInstanceFromNode: get parent component of any html element
   * */
  static getComponentDataInstanceFromNode($el: HTMLElement): INgProbeData {
    ////console.log("getComponentDataInstanceFromNode");
    ////console.log($el);
    ////console.log(ng);
    let probeData = (<any>window).ng.probe($el);
    console.log($el);
    if (!probeData) {
      console.error('NG:BUBBLE::Could not found related component') ;
      return;
    }
    let componentInstance = probeData.componentInstance;
    let componentNode = probeData.parent && probeData.parent.nativeElement;
    let injector = probeData.injector;
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
    let componentName = componentInstance.constructor.name;
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
    let newObj: any = {};
    let keysToStringify: string[] = (Array.isArray(keys) && keys.length > 0 && keys) || Object.keys(obj);
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


    if (element.id !== '')
      return 'id("' + element.id + '")';
    if (element === document.body)
      return element.tagName;

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
      var sibling = siblings[i];
      if (sibling === element)
        return this.getXPathByElement(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
        ix++;
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
      console.log(e);
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
    let stateStr: any = localStorage.getItem('NG_BUBBLE_STATE');
    let state = JSON.parse(stateStr);
    let x = this.jsonStringifyCyclic({...state, ...data});
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
    console.log('================prune============');
    let output;
      try {
        output = jsonPrune(obj, 5);
      }catch (e) {
        output = {};
        console.log(e);
      }
      return output;
  }

  static removeChildFromParent($el: HTMLElement) {
    let parent = $el.parentElement;
    // if(parent) parent.removeChild($el);
  }

  static removeChildrenWithClassName(className: string) {
    let elements = Array.from(document.getElementsByClassName(className));
    elements.forEach((el) => {
      el.parentNode && el.parentNode.removeChild(el);
    });
  }
}