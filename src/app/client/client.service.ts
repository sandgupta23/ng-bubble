import {EEditor_EVENTS} from '../enum';
import {EEditorInput, EWSTypes, ILineFinderData, INgProbeData, IWSData} from './interface';
import {Helper} from './helper';
import {NgBubbleDom} from './dom';
import {NgBubbleSocket} from './socket';
import {NgBubbleConstant} from './constant';

export class ClientService {

  private static readonly $editorEl: Element = document.getElementsByTagName('js-bubble')[0];
  private static isConnected = false;
  static init = function () {

    if(!ClientService.$editorEl){
      alert("ng-bubble:: Did you forget to add <js-bubble></js-bubble> before script?")
      return;
    }


    NgBubbleSocket.init(
      ClientService.websocketInitCB,
      ClientService.websocketOnMessageCB,
      ClientService.websocketOnErrorCB);

    /*TODO: use document.ready*/
    NgBubbleDom.init();
    ClientService.eventInit();

    if ((<any>window).NG_BUBBLE_IMPORTED) {
      //console.error('Error: ng-bubble has been imported more than once');
    }
  };

  static emitHoveredComponentData(component: object) {
    let ngProbeData: INgProbeData = Helper.getComponentDataInstanceFromNode(NgBubbleDom.$selectedComponent);
    NgBubbleDom.selectedComponent = ngProbeData.componentInstance;
    // let codeStr = stringify1(componentInstance);
    // ClientService.$editorEl.setAttribute(EEditorInput.componentstr, codeStr);
    ClientService.setEditorAttribute(EEditorInput.componentstr, ngProbeData);

  }


  /*
  * emitSelectedComponentFiles:
  * For selected component, send ng probe data and respective files to frontend
  * */
  static emitSelectedComponentData($selectedComponent) {
    if (!$selectedComponent) {
      return;
    }
    try {
      let ngProbeData: INgProbeData = Helper.getComponentDataInstanceFromNode($selectedComponent);
      let componentInstance = ngProbeData.componentInstance;
      NgBubbleDom.selectedComponent = componentInstance;
      ClientService.setEditorAttribute(EEditorInput.componentstr, ngProbeData);
      let payload = Helper.createLineFinderPayload(componentInstance, null);
      ClientService.sendMessageToServer({type: EWSTypes.COMPONENT_FILE_SEARCH, payload});
    } catch (e) {
      //console.error(e);
    }
  }

  static openComponentFileInIde(payload: ILineFinderData) {
    ClientService.sendMessageToServer({type: EWSTypes.open, payload});
  }

  static setEditorAttribute(key: EEditorInput, value: any) {
    // ClientService.$editorEl.setAttribute(key, value);
    try {
      let editorMember = ClientService.$editorEl[key];
      if (typeof editorMember === 'function') {
        editorMember(value);
      } else {
        ClientService.$editorEl[key] = value;
      }

    } catch (e) {

    }
  }


  private static openInIdeByNode(node:HTMLElement){
    let target = node;
    let $componentNode: HTMLElement | null = Helper.getParentComponentNode(target);
    let ngProbeData = Helper.getComponentDataInstanceFromNode($componentNode);
    console.info($componentNode);
    // let $componentNode: HTMLElement | null = ngProbeData.componentNode;
    let componentInstance = ngProbeData.componentInstance;
    let componentXPath = Helper.getXPathByElement($componentNode);
    if ($componentNode) {
      NgBubbleDom.selectedComponent = componentInstance;
      NgBubbleDom.$selectedComponent = $componentNode;
      NgBubbleDom.selectedElXpath = componentXPath;
      Helper.setState({selectedElXpath: componentXPath});
      let payload = Helper.createLineFinderPayload(componentInstance, target);

      /**
       * If ctrl === true, double click on any component will open component file in IDE
       * User can toggle behaviour using --ask
       * */
      // if (($event.ctrlKey && NgBubbleConstant.LOCAL_CONFIG.ctrl) || !($event.ctrlKey || NgBubbleConstant.LOCAL_CONFIG.ctrl)) {
        ClientService.openComponentFileInIde(payload);
      // } else {
      //   ClientService.setEditorAttribute(EEditorInput.componentstr, ngProbeData);
      //   ClientService.sendMessageToServer({type: EWSTypes.COMPONENT_FILE_SEARCH, payload});
      // }
    }
  }


  static eventInit() {
    ClientService.$editorEl.addEventListener('log$', (event: CustomEvent) => {
      let key = event.detail.key;
      let clone = event.detail.clone;
      if (!NgBubbleDom.selectedComponent) {
        //
        return;
      }
      if (!key || key == 'All') {
        //
      } else {
        //
      }
    });

    ClientService.$editorEl.addEventListener(EEditor_EVENTS.file_save_start$, (event: CustomEvent) => {

      let fileContent = event.detail.fileContent;
      let pathToOpen = event.detail.pathToOpen;
      ClientService.sendMessageToServer({
        type: EWSTypes.setFileByPath, payload: {
          file: fileContent,
          pathToOpen: pathToOpen
        }
      });
    });

    ClientService.$editorEl.addEventListener('searchTrigger$', (event: CustomEvent) => {
      let keyword = event.detail;
      ClientService.sendMessageToServer({type: EWSTypes.SEARCH, payload: {file: keyword}});
    });
    ClientService.$editorEl.addEventListener('getFileTrigger$', (event: CustomEvent) => {
      let keyword = event.detail;
      ClientService.sendMessageToServer({type: EWSTypes.getFileByPath, payload: {pathToOpen: keyword}});
    });
    ClientService.$editorEl.addEventListener('openInIde$', (event: CustomEvent) => {

      let data = event.detail;
      if(data.pathToOpen){
        ClientService.openComponentFileInIde(data);
      }
      if(data.node){
        ClientService.openInIdeByNode(data.node);
      }

      // if (data.tagName && data.ext)
      //   data.searchTerm = tagToFileName(data.tagName, data.ext);

    });
    ClientService.$editorEl.addEventListener('getSelectedComponentFiles$', (event: CustomEvent) => {
      ClientService.emitSelectedComponentData(NgBubbleDom.$hoveredComponent);
      // if ($hoveredComponent) {
      //   let componentInstance = Helper.getComponentDataInstanceFromNode($hoveredComponent).componentInstance;
      //   selectedComponent = componentInstance;
      //   ClientService.setEditorAttribute(EEditorInput.componentstr, JSON.stringify(componentInstance));
      //   let payload = createLineFinderPayload(componentInstance, null);
      //   ClientService.sendMessageToServer({type: EWSTypes.COMPONENT_FILE_SEARCH, payload});
      // }
    });
    ClientService.$editorEl.addEventListener('getHoveredComponentData$', (event: CustomEvent) => {

      let $selectedComponentNode: any = NgBubbleDom.$hoveredComponent || (NgBubbleDom.selectedElXpath && Helper.getElementByXpath(NgBubbleDom.selectedElXpath));
      if (!$selectedComponentNode) return;
      ClientService.emitSelectedComponentData($selectedComponentNode);
      /*
      * Only if no selectedElXpath is present, initiate it. This is because hovered components have
      * lower priority.
      * */

      let componentXPath = Helper.getXPathByElement($selectedComponentNode);
      NgBubbleDom.selectedElXpath = componentXPath;

      Helper.setState({selectedElXpath: componentXPath});


    });

    document.addEventListener('click', ($event) => {
      ClientService.setEditorAttribute(EEditorInput.showTooltipAttr, false);
    });
    document.addEventListener('dblclick', ($event) => {
      let target = $event.target as HTMLElement;
      let $componentNode: HTMLElement | null = Helper.getParentComponentNode(target);
      let ngProbeData = Helper.getComponentDataInstanceFromNode($componentNode);
      console.info($componentNode);
      // let $componentNode: HTMLElement | null = ngProbeData.componentNode;
      let componentInstance = ngProbeData.componentInstance;
      let componentXPath = Helper.getXPathByElement($componentNode);
      if ($componentNode) {
        NgBubbleDom.selectedComponent = componentInstance;
        NgBubbleDom.$selectedComponent = $componentNode;
        NgBubbleDom.selectedElXpath = componentXPath;
        Helper.setState({selectedElXpath: componentXPath});
        let payload = Helper.createLineFinderPayload(componentInstance, target);

        /**
         * If ctrl === true, double click on any component will open component file in IDE
         * User can toggle behaviour using --ask
         * */
        if (($event.ctrlKey && NgBubbleConstant.LOCAL_CONFIG.ctrl) || !($event.ctrlKey || NgBubbleConstant.LOCAL_CONFIG.ctrl)) {
          ClientService.openComponentFileInIde(payload);
        } else {
          ClientService.setEditorAttribute(EEditorInput.componentstr, ngProbeData);
          ClientService.sendMessageToServer({type: EWSTypes.COMPONENT_FILE_SEARCH, payload});
        }
      } else {
        //
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
        debugger;
      let target = $event.target as HTMLElement;
      ////
      let $component: HTMLElement;
      let componentData = Helper.getComponentDataInstanceFromNode(<HTMLElement>$event.target);
      if(!componentData){
        return;
      }
      $component = componentData.componentNode;
      //console.log($component);
      NgBubbleDom.$hoveredComponent = $component;
      if (!$component) return;

      let componentXPath = Helper.getXPathByElement($component);


      NgBubbleDom.hoveredElXpath = componentXPath;
      let rect = $component.getBoundingClientRect();
      let x = {
        left: rect.left,
        top: rect.top,
        componentName: Helper.getComponentDataInstanceFromNode($component).componentInstance.constructor.name,
        tagName: $component.tagName,
        componentNode: Helper.getComponentDataInstanceFromNode($component).componentNode
        // componentTagNamezzzzz
      };
      return ClientService.setEditorAttribute(EEditorInput.coords, x);
    });
  }




  static sendMessageToServer(data: { type: EWSTypes, payload?:ILineFinderData }) {
    ClientService.setEditorAttribute(EEditorInput.isLoading, true);
    NgBubbleSocket.sendMessage(data);
  }


  /*
  * websocketInitCB: When websocket successfully connects, send select component file to editor
  * and get configuration from server
  * */
  static websocketInitCB = () => {
    ClientService.emitSelectedComponentData(NgBubbleDom.$selectedComponent);
    ClientService.setEditorAttribute(EEditorInput.isLoading, false);
    ClientService.setEditorAttribute(EEditorInput.status, {connection: true});
    ClientService.sendMessageToServer({type: EWSTypes.getConfig});
  };

  static websocketOnMessageCB = function (event) {
    ClientService.setEditorAttribute(EEditorInput.isLoading, false);
    ClientService.setEditorAttribute(EEditorInput.isLoading, false);
    if (!event) return;
    let data: IWSData = JSON.parse(event.data);
    let payload: any = data.payload;
    if (data.type === EWSTypes.SEARCH) {
      let files = payload.files || [];
      ClientService.setEditorAttribute(EEditorInput.searchfiles, files);
    }
    if (data.type === EWSTypes.COMPONENT_FILE_SEARCH) {
      let files = payload.files || [];
      ClientService.setEditorAttribute(EEditorInput.componentfiles, files);
    }
    if (data.type === EWSTypes.getFileByPath) {
      /*TODO: unfortunate key naming here*/
      let fileContent = payload.file || [];
      ClientService.setEditorAttribute(EEditorInput.filecontent, fileContent);
    }
    if (data.type === EWSTypes.getConfig) {
      NgBubbleConstant.LOCAL_CONFIG = payload;
      ClientService.setEditorAttribute(EEditorInput.config, payload);
    }

  };
  static websocketOnErrorCB = (err) => {
    ClientService.setEditorAttribute(EEditorInput.isLoading, false);
    ClientService.setEditorAttribute(EEditorInput.status, {connection: false});
  };


}
