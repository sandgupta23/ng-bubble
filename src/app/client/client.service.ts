
import {EEditor_EVENTS} from '../enum';
import jsonPrune from 'json-prune';
import {ILocalConfig} from '../interface';
import {EEditorInput, EWSTypes, ILineFinderData, INgProbeData, IWSData} from './interface';

const NG_BUBBLE_EVENTS: { start: EEditor_EVENTS, end: EEditor_EVENTS, error: EEditor_EVENTS }[] = [
  {start: EEditor_EVENTS.file_save_start$, end: EEditor_EVENTS.file_save_end$, error: EEditor_EVENTS.file_save_error$},
];

const possibleRootTags = ['my-app', 'app-root', 'root'];


declare let ng: any;
declare let CodeMirror: any;

export class ClientService {
  static init = function () {

    function rootInitialization() {
      $selectedComponent = <HTMLElement>getRootEl(possibleRootTags);
      $hoveredComponent = $selectedComponent;
      selectedComponent = getComponentDataInstanceFromNode($selectedComponent).componentInstance;
      // selectedElXpath = $selectedComponent && getXPathByElement($selectedComponent);
    }

    function stateInitialization() {
      let selectedElXpath = state.selectedElXpath;
      // let hoveredElXpath = state.hoveredElXpath;//
      // selectedElXpath = $selectedComponent && getXPathByElement($selectedComponent);
      $selectedComponent = <HTMLElement>getElementByXpath(selectedElXpath);
      // $hoveredComponent = <HTMLElement>getElementByXpath(hoveredElXpath);
      selectedComponent = getComponentDataInstanceFromNode($selectedComponent).componentInstance;
      // hoveredComponent = getComponentDataInstanceFromNode($hoveredComponent).componentInstance;
    }

    ////console.log(document);
    const BACKEND_ROOT = 'http://localhost:11637';
    /*TODO: do we need saperate $hoveredComponent and $selectedComponentNode?*/
    /*
    * When the app starts for the first time, root component data will be shown
    * */
    let $selectedComponent: HTMLElement;
    let selectedElXpath: string | any;
    let hoveredElXpath: string | any;
    let selectedComponent: Object;
    let hoveredComponent: Object;
    let $hoveredComponent: HTMLElement;


    let LOCAL_CONFIG: ILocalConfig = { /*backend configurations selection made by user with ng-bubble command*/
      ctrl: false,
      preferredIde: 'WEBSTORM',
      guess: false,
      inputTaken: false,
      componentSelector: 'app'
    };

    /*state initialization from localstorage*/
    let stateStr: any = localStorage.getItem('NG_BUBBLE_STATE');
    let state = stateStr && JSON.parse(stateStr);
    selectedElXpath = state && state.selectedElXpath;
    hoveredElXpath = state && state.hoveredElXpath;


    // emitHoveredComponentData($hoveredComponent);
      emitSelectedComponentFiles($selectedComponent);

    let socket = new WebSocket('ws://localhost:11640');
    socket.onopen = function (event) {
      ////console.log('NG:BUBBLE: Connection successful!');
      sendMessage({type: EWSTypes.getConfig});
    };
    socket.onclose = function (event) {
      ////console.log(event);
      setTimeout(() => {
        // location.reload();
      }, 5000);/*TODO: a better way of doing this?*/
    };

    socket.onerror;
    socket.onmessage = function (event) {

      let data: IWSData = JSON.parse(event.data);
      let payload: any = data.payload;
      if (data.type === EWSTypes.SEARCH) {
        let files = payload.files || [];
        setEditorAttribute(EEditorInput.searchfiles, files);
      }
      if (data.type === EWSTypes.COMPONENT_FILE_SEARCH) {
        let files = payload.files || [];
        setEditorAttribute(EEditorInput.componentfiles, files);
      }
      if (data.type === EWSTypes.getFileByPath) {
        /*TODO: unfortunate key naming here*/
        let fileContent = payload.file || [];
        setEditorAttribute(EEditorInput.filecontent, fileContent);
      }
      if (data.type === EWSTypes.getConfig) {
        LOCAL_CONFIG = payload;
        setEditorAttribute(EEditorInput.config, payload);
      }
    };

    function sendMessage(data: IWSData) {
      ////console.log('sendMessage', data);
      try {
        socket.send(JSON.stringify(data));
      }catch (e) {

      }
    }

    if ((<any>window).NG_BUBBLE_IMPORTED) {
      console.error('Error: ng-bubble has been imported more than once');
    }
    let $editorEl = document.getElementsByTagName('js-bubble')[0];

    console.log(state.selectedElXpath);
    if (!state || !state.selectedElXpath) {/*if no state is saved in local storage, open root components*/
      rootInitialization();
    } else {
      stateInitialization();
    }
    $editorEl.addEventListener('searchTrigger$', (event: CustomEvent) => {
      let keyword = event.detail;
      sendMessage({type: EWSTypes.SEARCH, payload: {file: keyword}});
    });
    $editorEl.addEventListener('getFileTrigger$', (event: CustomEvent) => {
      let keyword = event.detail;
      sendMessage({type: EWSTypes.getFileByPath, payload: {pathToOpen: keyword}});
    });
    $editorEl.addEventListener('openInIde$', (event: CustomEvent) => {
      let data = event.detail;
      // if (data.tagName && data.ext)
      //   data.searchTerm = tagToFileName(data.tagName, data.ext);
      openComponentFileInIde(data);
    });
    $editorEl.addEventListener('getSelectedComponentFiles$', (event: CustomEvent) => {
      emitSelectedComponentFiles($hoveredComponent);
      // if ($hoveredComponent) {
      //   let componentInstance = getComponentDataInstanceFromNode($hoveredComponent).componentInstance;
      //   selectedComponent = componentInstance;
      //   setEditorAttribute(EEditorInput.componentstr, JSON.stringify(componentInstance));
      //   let payload = createLineFinderPayload(componentInstance, null);
      //   sendMessage({type: EWSTypes.COMPONENT_FILE_SEARCH, payload});
      // }
    });
    $editorEl.addEventListener('getHoveredComponentData$', (event: CustomEvent) => {

      let $selectedComponentNode: any = $hoveredComponent || (selectedElXpath && getElementByXpath(selectedElXpath));
      if (!$selectedComponentNode) return;
      emitSelectedComponentFiles($selectedComponentNode);
      /*
      * Only if no selectedElXpath is present, initiate it. This is because hovered components have
      * lower priority.
      * */

      let componentXPath = getXPathByElement($selectedComponentNode);
      selectedElXpath = componentXPath;

      setState({selectedElXpath: componentXPath});


    });

    function emitHoveredComponentData(component: object) {
      let ngProbeData: INgProbeData = getComponentDataInstanceFromNode($selectedComponent);
      selectedComponent = ngProbeData.componentInstance;
      // let codeStr = stringify1(componentInstance);
      // $editorEl.setAttribute(EEditorInput.componentstr, codeStr);
      setEditorAttribute(EEditorInput.componentstr, ngProbeData);

    }

    function emitSelectedComponentFiles($selectedComponent) {
      let ngProbeData: INgProbeData = getComponentDataInstanceFromNode($selectedComponent);
      let componentInstance = ngProbeData.componentInstance;
      selectedComponent = componentInstance;
      setEditorAttribute(EEditorInput.componentstr, ngProbeData);
      let payload = createLineFinderPayload(componentInstance, null);
      sendMessage({type: EWSTypes.COMPONENT_FILE_SEARCH, payload});
    }

    function createLineFinderPayload(componentInstance: object, target$) {
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

    function camelCaseToDotCase(camel: string) {
      return camel.replace(/[A-Z]/g, m => ' ' + m.toLowerCase());
    }

    function tagToFileName(tag: string, ext: string = '') {
      if (!ext) {
        throw 'no extension provided';
      }
      if (!tag) {
        throw 'no tagName provided';
      }
      // return tag.replace(COMPONENT_PREFIX, '') + '.component.' + ext;
      return removeComponentPrefix(tag) + '.component.' + ext;
    }

    $editorEl.addEventListener('log$', (event: CustomEvent) => {
      let key = event.detail.key;
      let clone = event.detail.clone;
      if (!selectedComponent) {
        //console.log('NG:BUBBLE:: IMPORTANT! This is a clone. Please select a component to get the real reference', clone);
        return;
      }
      if (!key || key == 'All') {
        //console.log('NG:BUBBLE:: ', selectedComponent);
      } else {
        //console.log('NG:BUBBLE:: ', selectedComponent[key]);
      }
    });

    $editorEl.addEventListener(EEditor_EVENTS.file_save_start$, (event: CustomEvent) => {

      let fileContent = event.detail.fileContent;
      let pathToOpen = event.detail.pathToOpen;
      sendMessage({
        type: EWSTypes.setFileByPath, payload: {
          file: fileContent,
          pathToOpen: pathToOpen
        }
      });
    });

    function setState(data: object = {}) {
      let stateStr: any = localStorage.getItem('NG_BUBBLE_STATE');
      let state = JSON.parse(stateStr);
      let x = jsonStringifyCyclic({...state, ...data});
      localStorage.setItem('NG_BUBBLE_STATE', x);
    }

    document.addEventListener('dblclick', ($event) => {
      let target = $event.target as HTMLElement;
      let ngProbeData = getComponentDataInstanceFromNode(target);
      let $componentNode: HTMLElement | null = ngProbeData.componentNode;
      let componentInstance = ngProbeData.componentInstance;
      let componentXPath = getXPathByElement($componentNode);
      if ($componentNode) {
        selectedComponent = componentInstance;
        $selectedComponent = $componentNode;
        selectedElXpath = componentXPath;
        setState({selectedElXpath: componentXPath});

        let payload = createLineFinderPayload(componentInstance, target);

        /**
         * If ctrl === true, double click on any component will open component file in IDE
         * User can toggle behaviour using --ask
         * */
        if (($event.ctrlKey && LOCAL_CONFIG.ctrl) || !($event.ctrlKey || LOCAL_CONFIG.ctrl)) {
          openComponentFileInIde(payload);
        } else {
          setEditorAttribute(EEditorInput.componentstr, ngProbeData);
          sendMessage({type: EWSTypes.COMPONENT_FILE_SEARCH, payload});
        }
      } else {
        //console.log('NG-BUBBLE:: COULDNT FIND COMPONENT');
      }

    });

    /*
    * mouseover: will be triggered when any element on the host application will be hovered.
    * The purpose here is to shouldFoldCode the menu, by finding the component parent
    * */
    document.addEventListener('mouseover', ($event) => {
      if (!$event.shiftKey) {
        return;
      }

      let target = $event.target as HTMLElement;
      ////console.log(target);
      let $component: HTMLElement = getComponentDataInstanceFromNode(<HTMLElement>$event.target).componentNode;
      $hoveredComponent = $component;
      if (!$component) return;

      let componentXPath = getXPathByElement($component);


      hoveredElXpath = componentXPath;
      // setState({hoveredElXpath: componentXPath, selectedElXpath:""});

      // //console.log($component);
      // let top = $component.offsetTop;
      // let left = $component.offsetWidth;
      ////console.log($component.getBoundingClientRect());
      let rect = $component.getBoundingClientRect();
      let x = {
        left: rect.left,
        top: rect.top,
        componentName: getComponentDataInstanceFromNode($component).componentInstance.constructor.name,
        tagName: $component.tagName
      };
      ////console.log(x);
      return setEditorAttribute(EEditorInput.coords, x);
    });

    function openComponentFileInIde(payload: ILineFinderData) {
      sendMessage({type: EWSTypes.open, payload});
    }

    function removeComponentPrefix(tag: string) {
      if (!tag) throw 'removeComponentPrefix: no tag in removeComponentPrefix';
      let tagSplits: string[] = tag.split('-');
      tagSplits.shift();
      return tagSplits.join('.');

    }

    function setEditorAttribute(key: EEditorInput, value: any) {
      // $editorEl.setAttribute(key, value);
      try {
        let editorMember = $editorEl[key];
        if (typeof editorMember === 'function') {
          editorMember(value);
        } else {
          $editorEl[key] = value;
        }

      } catch (e) {
        console.log(e, key, value);
      }
    }

    function removeChildFromParent($el: HTMLElement) {
      let parent = $el.parentElement;
      // if(parent) parent.removeChild($el);
    }

    function removeChildrenWithClassName(className: string) {
      let elements = Array.from(document.getElementsByClassName(className));
      elements.forEach((el) => {
        el.parentNode && el.parentNode.removeChild(el);
      });
    }


    /*
    * TODO: implement it later
    * */
    function showBranches(target: HTMLElement) {
      // let parent: HTMLElement | null = target, child: HTMLElement | null = target;
      // while (parent) {
      //   parent = findParentComponentElement(parent, 1);
      //   parent && showComponentMarkerOnComponent(parent);
      // }
    }


    /*
    * getComponentDataInstanceFromNode: get parent component of any html element
    * */
    function getComponentDataInstanceFromNode($el: HTMLElement): INgProbeData {
      ////console.log("getComponentDataInstanceFromNode");
      ////console.log($el);
      ////console.log(ng);
      let probeData = ng.probe($el);
      console.log($el);
      if (!probeData) {
        throw 'NG:BUBBLE::Could not found related component';
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

    /*
    * stringify1: Partially convert an object to string, on the basis of keys provided
    * obj: object to be stringified
    * keys: keys which are to be stringified
    * */
    function stringify1(obj: object, keys?: string[]) {
      let newObj: any = {};
      let keysToStringify: string[] = (Array.isArray(keys) && keys.length > 0 && keys) || Object.keys(obj);
      keysToStringify.forEach((key) => {
        newObj[key] = obj[key];
      });
      return jsonStringifyCyclic(newObj);
    }

    /*
    * jsonStringifyCyclic:
    * Stringify cyclic JSON
    * */
    // function jsonStringifyCyclic(obj):string {
    //   return JSON.stringify(jc.decycle(obj));
    // }

    function jsonStringifyCyclic(obj) {
      /*TODO: move to web worker*/
      // return  JSON.stringify(jc.decycle(obj));
      console.log('================prune============');
      return jsonPrune(obj, 5);
    }

    /*
    * hasClass:
    * Check if some html element has a given class
    * */
    function hasClass(element: HTMLElement, thatClass: string): boolean {
      return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + thatClass + ' ') > -1;
    }


    /*
    *getPathTo: get xpath using element
    * https://stackoverflow.com/questions/2631820/how-do-i-ensure-saved-click-coordinates-can-be-reloaed-to-the-same-place-even-i/2631931#2631931
    * */
    function getXPathByElement(element) {


      if (element.id !== '')
        return 'id("' + element.id + '")';
      if (element === document.body)
        return element.tagName;

      var ix = 0;
      var siblings = element.parentNode.childNodes;
      for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element)
          return getXPathByElement(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
          ix++;
      }
    }

    /**
     * getElementByXpath
     * https://stackoverflow.com/questions/10596417/is-there-a-way-to-get-element-by-xpath-using-javascript-in-selenium-webdriver
     * */
    function getElementByXpath(path) {
      let node: Node;
      try {
        node = document.evaluate('html/' + path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      } catch (e) {
        console.log(e);
      }
      return node;
    }

    function getRootEl(possibleTags: string[]) {
      for (let tag of possibleTags) {
        let elements = document.getElementsByTagName(tag);
        if (elements && elements[0]) {
          return elements[0];
        }
      }
    }

  };


}
