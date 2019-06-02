import {ChangeDetectorRef, Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
// import { parse, stringify } from 'flatted';
import * as JSON_STRIGIFY_SAFE from 'json-stringify-safe';


import jc from 'json-cycle';
import jsonPrune from 'json-prune';
import {storeKeys} from './store.service';
import {IHeaderFormData} from './editor-wrapper/editor-wrapper.component';
import {EHeaderFormDataKeys} from './editor-wrapper/editor-header/editor-header.component';

import * as CodeMirror from 'codemirror';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/mode/python/python.js';
import {INgProbeData} from './client/interface';
import {LoggingService} from './editor-wrapper/logging.service';
import {ComponentInstanceService} from './component-instance.service';

const COMPONENT_SELECTOR = 'app';

const EXCLUDED_CONSTRUCTIONS = ['ViewRef_','ViewRef'];

export const sideBaseClasses = [
  'vs-code-grey',
  'fa-search',
  'fa-save',
  'fa-repeat',
  'fa-terminal',
  'fa-angle-left',
  'fa-angle-right',
  'fa-angle-down',
  'fa-angle-up',
  'fa-expand',
  'fa-compress',
  'fa-window-minimize',
  'fa-window-maximize',
  'jsb-editor-wrapper-header__keys',
  'jsb-editor-wrapper-header__files',
  'fa-angle-double-right',
  'fa-angle-double-down',
  'fa-file',
  'fa-code',
  'fa-power-off',
  'menu__item-html',
  'menu__item-ts',
  'menu__item-data',
  'menu__item-ide',
];


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private formBuilder: FormBuilder) {
  }

  getHeaderForm() {
    return this.formBuilder.group({
      fileName: [''],
      key: [''],
      editorMode: [false],
    });
  }

  getSearchForm() {
    return this.formBuilder.group({
      keyword: [''],
    });
  }


  static codeMirrorInit(editorTextArea) {
    let codemirror = CodeMirror.fromTextArea(editorTextArea, {
      lineNumbers: true,
      lineWrapping: true,
      theme: 'night',
      rtlMoveVisually: false,
      direction: 'ltr',
      moveInputWithCursor: false,
      pollInterval: 100000,
      extraKeys: {
        'Ctrl-Q': function (codemirror: any) {
          codemirror.foldCode(codemirror.getCursor());
        },
        'Ctrl-Space': 'autocomplete',
        'Alt-F': 'findPersistent'
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    });
    //  codemirror.setOption("extraKeys", {
    //   "Ctrl-Y": cm => {
    //     codemirror.operation(function () {
    //       for (var l = codemirror.firstLine(); l <= codemirror.lastLine(); ++l)
    //         if (l > 1) {
    //           codemirror.foldCode({line: l, ch: 0}, null, 'fold');
    //         }
    //     });
    //     // CodeMirror.commands.foldAll(cm)
    //   },
    //   "Ctrl-I": cm => {
    //     CodeMirror.commands.unfoldAll(cm)
    //   },
    // });

    return codemirror;
  }

  static hasClass(target: HTMLElement, className): boolean {
    return target.classList.contains(className);
  }

  static extractStoreData(obj) {

    let x = storeKeys.reduce((total, key) => {
      return {...total, [key]: obj[key]};
    }, {});
    return x;
  }


  /*
  * jsonStringifyCyclic: parse cyclic json
  * Example:
  *  var a = {name:"john doe"};
  *  a.self = a; //Now a is cycle JSON.
  *  Result: "{"name":"john doe","self":{"$ref":"$"}}"
  * */
  static jsonStringifyCyclic(obj, level = 3) {
    /*TODO: move to web worker*/

    // obj = {...obj, ...Object.getPrototypeOf(obj)};
    console.log(Object.getPrototypeOf(obj));
    var options = {
      replacer: function (value, defaultValue, circular) {
        // if (circular) return '"-circular-"';
        if (circular) {
          if (value && value.value) {
            try {
              return JSON.stringify({value: value.value, '-other-': '-circular-'});
            } catch (e) {
              return '--circular--';
            }
          }
        }
        // if (circular) return JSON_STRIGIFY_SAFE(value);
        if (value === undefined) return '"-undefined-"';
        if (typeof value === 'function') return '"-method-"';
        if (Array.isArray(value)) {
          return JSON.stringify(value);
        }
        if (value === undefined || value === null) {
          return `-${value}-`;
        }
        return defaultValue;
      }
    };
    // if(obj.changeDetectorRef instanceof ChangeDetectorRef){
    //   alert();
    // }
    (window as any).jsonPrune = jsonPrune;
    let x = jsonPrune(obj, options, 4);


    (window as any).JSON_STRIGIFY_SAFE = JSON_STRIGIFY_SAFE;
    // console.log(JSON_STRIGIFY_SAFE);
    // console.log(JSON_STRIGIFY_SAFE(obj));
    // return stringify(obj);
    // return JSON.parse(stringify(obj));
    // return JSON_STRIGIFY_SAFE(obj);
    return x;
  }

  static parseCircular(obj) {
    // return parse(obj)
  }

  // addPojoPropsCircularKey(obj){
  //     Object.keys(obj).forEach((key)=>{
  //       if(obj[key]==='-circular-'){
  //         Object.keys(obj[key]).forEach((circularKeys)=>{
  //           if
  //         })
  //       }
  //     })
  // }

  static unfoldCode(codemirror) {
    CodeMirror.commands.unfoldAll(codemirror);
  }

  static foldCode(codemirror) {

    /*TODO: */
    setTimeout(() => {/*computation heavy task*/
      for (var l = codemirror.firstLine(); l <= codemirror.lastLine(); ++l)
        if (l > 1) {
          codemirror.foldCode({line: l, ch: 0}, null, 'fold');
        }
    });
  }

  static getComponentWithoutInjectedMembers(ngProbeData: INgProbeData) {
    let injector = ngProbeData.injector;
    let componentInstance = ngProbeData.componentInstance;
    let providers: any[] = injector['view']['root']['ngModule']['_providers'];
    let x = Object.keys(componentInstance).reduce((total, key) => {
      let val = componentInstance[key];
      if (typeof val !== 'object' || !providers.find(e => e === val)) {
        return {...total, [key]: componentInstance[key]};
      }
      return total;
    }, {});

    return x;
  }

  static getClickedSideBarIcon(clickEvent: Event) {
    let target = clickEvent.target;
    for (let className of sideBaseClasses) {
      if (UtilityService.hasClass(<HTMLElement>target, className)) {
        return className;
      }
    }
  }

  /**
   * getCodeText: get code text based on the changed form data, after user interaction with header form data.
   * oldData: old Header data
   * newData: Header form data after user interaction
   * */
  static getCodeText(headerData: IHeaderFormData, componentObj: object): string {
    let key = Object.keys(headerData)[0];
    let codeText: any;
    let val = headerData[key];
    if (!val || val === 'All') {
      codeText = componentObj;
    } else {
      codeText = {[val]: componentObj[val]};
    }


    return JSON.parse(this.jsonStringifyCyclic(codeText, 6));
  }


  static getChangedKey(obj1: object, obj2: object): EHeaderFormDataKeys[] {
    let keysChanged = [];
    for (let key of Object.keys(obj1)) {
      if (obj1[key] !== obj2[key]) {
        keysChanged.push(key);
      }
    }
    return keysChanged;
  }

  /**
   * getChildObjectByPath: get a subtree by path in a bigger tree (object)
   * example:
   * path = "address country" //saperated by space
   * returned obj["address"]["country"]
   * */
  static getChildObjectByPath(obj, path) {
    if (!path || !obj || typeof obj !== 'object') {
      return obj;
    }
    let pathSplit = path.split(' ');

    for (var i = 0; i < pathSplit.length; i++) {
      obj = obj[pathSplit[i]];
    }
    return obj;
  }


  /*
  * removeDependeciesFromInstance:
  * A component class is called dependencies if its provided via injector
  * via constructor
  *
  * Why are we removing it:
  * From my experience people aren't interested in dependencies when they
  * are browsing the component state. These dependencies are huge and cause performance issues.
  * Better to not to have them.
  * */
  pruneDependenciesFromInstance(instance) {

    let dependencies = ComponentInstanceService.getDependencies(instance).map(e=>e.name);
    let tempInstance = {...instance};
    let excludedKeys = [...dependencies, ...EXCLUDED_CONSTRUCTIONS];
    Object.keys(tempInstance).forEach((key) => {
      excludedKeys.forEach((dependency)=>{
        if (tempInstance[key] && tempInstance[key].constructor && tempInstance[key].constructor.name === dependency) {
          tempInstance[key] = `-dependency pruned: ${dependency}-`;
        }
      })
    });
    return tempInstance;
  }
}
