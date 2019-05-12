import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {UtilityService} from '../utility.service';
import {FormGroup} from '@angular/forms';
import {EventService} from '../event.service';
import {IFileData} from './file-search-panel/file-search-panel.component';
import {ClientService,} from '../client/client.service';
import {JsbEditorComponent} from './jsb-editor/jsb-editor.component';
import {StoreService} from '../store.service';
import {IStore} from '../interface';
import {EHeaderFormDataKeys} from './editor-header/editor-header.component';
import {INgProbeData} from '../client/interface';
import {debounce, debounceTime} from 'rxjs/operators';
import {MockDataService} from './mockDataService';


export interface IHeaderFormData {
  fileName?: string,
  key?: string,
  editorMode?: string,
}

// @ts-ignore
@Component({
  selector: 'jsb-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EditorWrapperComponent implements OnInit, AfterViewInit, DoCheck {
  obj;
  editorMode;
  testObj = {name: 'sandeep', place: {city: {landmark: {name: 'up'}}}};
  keySearchKeyword: string;
  keySearchKeywordChanged$ = new EventEmitter();
  _status: { connection: boolean };
  @Output() file_save_start$ = new EventEmitter();
  @Output() searchTrigger$ = new EventEmitter();
  @Output() getFileTrigger$ = new EventEmitter();
  @Output() getSelectedComponentFiles$ = new EventEmitter();
  @Output() getHoveredComponentData$ = new EventEmitter();
  @Output() log$ = new EventEmitter();
  @Output() openInIde$ = new EventEmitter();

  @Input() set status(status: { connection: boolean }) {
    this._status = status;
    if (!status.connection) {
      this.fileData = 'NG:BUBBLE:: No connection with server. Please restart server using command `ng-bubble` in project root';
    }
  };

  @Input() isLoading = true;
  @Input() componentfiles = (val: IFileData[]) => {
    debugger;
    this._componentfiles = val;
    if (Array.isArray(this._componentfiles) && this._componentfiles.length > 0 && !this._componentfiles.find((key) => key === this.headerForm.value['fileName'])) {
      setTimeout(() => this.patchForm(this.headerForm, {fileName: this._componentfiles[0].name}));
    }
  };

  @Input() componentstr = (ngProbeData: INgProbeData, isInit: boolean = false) => {
    this.componentObj = {...ngProbeData.componentInstance, ...Object.getPrototypeOf(ngProbeData.componentInstance)};
    if (!isInit) {
      this.path = '';
    }
    //.constructor.prototype.ngDoCheck
    // this.addDoCheckHook(ngProbeData.componentInstance);/*TODO: Don't delete */

    // let activeComponentKey = this.headerForm.value['key'];
    // this.keyOptions = ['All', ...Object.keys(this.componentObj)];
    // let isActiveComponentKeyPresent = this.keyOptions.findIndex((key) => key === activeComponentKey) !== -1;
    // if (!isActiveComponentKeyPresent || 'All' === activeComponentKey) {
    //   setTimeout(() => this.patchForm(this.headerForm, {key: 'All'}));
      this.codeData = JSON.parse(UtilityService.jsonStringifyCyclic(this.componentObj));
    // } else {
    //   this.codeData = {[activeComponentKey]: this.componentObj [activeComponentKey]};
    // }
    StoreService.patchStore(UtilityService.extractStoreData(this));//TODO: bad!
    this.changeDetectorRef.detectChanges();
  };

  @Input() coords = (coordsStr) => {
    //
    let coords = coordsStr;
    let top = coords.top + 'px';
    let left = coords.left + 'px';
    this._coords = {...coords, left, top};

    this.showTooltip = true;
    StoreService.patchStore(UtilityService.extractStoreData(this));//TODO: bad!
    this.changeDetectorRef.detectChanges();
  };

  @Input() searchfiles = (val: string) => {
    EventService.searchResultsFinish$.emit(val);
  };

  @Input() showTooltipAttr =  (val: boolean) => {
    this.showTooltip = val;
    this.changeDetectorRef.detectChanges();
  };
  @Input() filecontent = (val: string) => {
    console.log(val);
    debugger;
    this.fileData = val;
    // this.headerForm.patchValue({editorMode:true});
    this.changeDetectorRef.detectChanges();
  };


  @Input() config  =  (val) => {
    this._config = val;
    StoreService.config = val;
    this.changeDetectorRef.detectChanges();
  };

  @ViewChild(JsbEditorComponent) appEditorComponent: JsbEditorComponent;
  @ViewChildren('menu') menu: QueryList<any>;
  _config;

  minimize = false;
  expand = false;
  _componentfiles: IFileData[];
  _componentstr: string;
  showSearchPanel = false;
  showTooltip = false;
  top = '50vh';
  left = '50vw';
  _coords: { top: string, left: string, componentName: string, tagName: string, componentTagName:string, componentNode:HTMLElement };
  right = '0';
  bottom = '0';
  activeHeaderTab: EHeaderFormDataKeys = null;
  myEHeaderFormDataKeys = EHeaderFormDataKeys;
  shouldFoldCode = true;
  componentObj: object = {};
  keyOptions = ['All'];
  myObject = Object;
  codeData: any = MockDataService.codeData;
  fileData: any = {};
  path: any = '';
  headerForm: FormGroup;
  headerFormData: IHeaderFormData = {};
  BACKEND_IMG_ROOT = 'http://localhost:11637/assets/imgs/';
  length = 0;
  a={a:{b:{c:{d:this.a}}}};


  constructor(private utilityService: UtilityService, private changeDetectorRef: ChangeDetectorRef) {
  }



  ngOnInit() {
    this.keySearchKeywordChanged$.pipe(debounceTime(500)).subscribe((keySearchKeyword:string)=>{
      this.keySearchKeyword = keySearchKeyword;
      this.changeDetectorRef.detectChanges();
    });
    StoreService.init();
    let store = StoreService.getStoreValue();
    this.initializeComponent(store);
    this.headerForm = this.utilityService.getHeaderForm();

    this.patchForm(this.headerForm, this.headerFormData);
    this.headerForm.valueChanges.subscribe((value) => {
      debugger;
      this.headerFormData = value;
      this.editorMode = this.headerFormData.editorMode;
      StoreService.patchStore(UtilityService.extractStoreData(this));
      this.changeDetectorRef.detectChanges();
    });
    this.changeDetectorRef.detectChanges();
  }


  /*
  * headerDataChangedHandler:
  * is called when form header files select are changed by (headerDataChanged$)
  * Will trigger an event to get selected file
  * */
  headerDataChangedHandler(headerData: IHeaderFormData) {
    let key = Object.keys(headerData)[0];
    if ('key' === key) this.codeData = UtilityService.getCodeText(headerData, this.componentObj);
    else {
      let fileName = headerData[key];
      let filePath = this._componentfiles.find((file) => file.name === fileName).path;
      this.getFileTrigger$.emit(filePath);
    }
    this.changeDetectorRef.detectChanges();
  }

  getFilePathByName(componentfiles: IFileData[], fileName) {
    return componentfiles.find((file) => file.name === fileName).path;
  }

  /*
  * miscEventHandler:
  * Handles events from various places like:
  * 1. jsb-menu component
  * 2. jsb-editor-header component
  * 3. jsb-editor-sidebar component
  *
  * */
  miscEventHandler(event: Event) {

    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
      StoreService.patchStore(UtilityService.extractStoreData(this));
    });


    let className = UtilityService.getClickedSideBarIcon(event);
    switch (className) {
      case 'vs-code-grey' : {
        let path = this.getFilePathByName(this._componentfiles, this.headerForm.get('fileName').value);
        this.openInIde$.emit({pathToOpen: path});
        break;
      }
      case 'fa-search' : {
        event.stopPropagation();
        setTimeout(() => {
          /*todo: hack...issues with clickoutside*/
          this.showSearchPanel = !this.showSearchPanel;
          this.changeDetectorRef.detectChanges();
          StoreService.patchStore(UtilityService.extractStoreData(this));
        });
        break;
      }
      case 'fa-save' : {
        let codeText = this.appEditorComponent.codemirror.getValue();
        this.codeData = codeText;
        let path = this.getFilePathByName(this._componentfiles, this.headerForm.get('fileName').value);
        this.file_save_start$.emit({fileContent: codeText, pathToOpen: path});
        break;
      }
      case 'fa-repeat' : {
        this.getSelectedComponentFiles$.emit();
        this.getHoveredComponentData$.emit();
        break;
      }
      case 'fa-terminal' : {
        this.logCurrentData();
        break;
      }
      case 'fa-angle-left' : {
        this.left = '0';
        this.right = 'auto';
        break;
      }
      case 'fa-angle-right' : {
        this.left = 'auto';
        this.right = '0';
        break;
      }
      case 'fa-angle-down' : {
        this.top = 'auto';
        this.bottom = '0';
        break;
      }
      case 'fa-angle-up' : {
        this.top = '0';
        this.bottom = 'auto';
        break;
      }
      case 'fa-expand' : {
        this.left = '15vw';
        this.top = '15vh';
        this.right = '0';
        this.bottom = '0';
        this.minimize = false;
        this.expand = true;
        break;
      }
      case 'fa-angle-double-right' : {
        this.shouldFoldCode = false;
        EventService.foldCodeInCodemirror$.emit(this.shouldFoldCode);
        break;
      }
      case 'fa-angle-double-down' : {
        this.shouldFoldCode = true;
        EventService.foldCodeInCodemirror$.emit(this.shouldFoldCode);
        break;
      }
      // case 'fa-file' : {
      //   this.activeHeaderTab = EHeaderFormDataKeys.fileName;
      //   this.headerDataChangedHandler({fileName: this.headerFormData.fileName});
      //   break;
      // }
      // case 'fa-code' : {
      //
      //   this.headerDataChangedHandler({key: this.headerFormData.key});
      //   this.activeHeaderTab = EHeaderFormDataKeys.key;
      //   break;
      // }
      case 'fa-compress' : {

        this.left = '50vw';
        this.top = '50vh';
        this.right = '0';
        this.bottom = '0';
        this.expand = false;
        break;
      }
      case 'fa-window-minimize' : {
        this.minimize = true;
        break;
      }

      /*menu items*/
      case 'menu__item-html' : {
        this.openInIde(this._coords.componentName, 'html', this._coords.componentNode);
        break;
      }
      case 'menu__item-ts' : {
        this.openInIde(this._coords.componentName, 'ts', this._coords.componentNode,);
        break;
      }
      case 'menu__item-data' : {
        debugger;
        this.getSelectedComponentFiles$.emit();
        this.getHoveredComponentData$.emit();
        this.minimize = false;
        break;
      }
      case 'menu__item-ide' : {
        alert('ide');
        break;
      }
    }
  }

  openInIde(componentName: string, ext: string, $node:EventTarget) {
    this.openInIde$.emit({node:$node});
  }


  ngAfterViewInit(): void {
    setTimeout(() => {/*TODO: hack. @output events dont work without settimeout*/

      try {
        ClientService.init();
        window.onload = function () {
          ClientService.init();
        };

        if (this.activeHeaderTab === EHeaderFormDataKeys.key) {
          this.getHoveredComponentData$.emit();
        }
      } catch (e) {
        //console.error(e);
      }
    }, 1000);
  }


  initializeComponent(store: IStore) {
    Object.keys(store).forEach((key) => {
      if (typeof store[key] !== 'function') {
        if (key !== 'selectedElXpath' && key !== 'hoveredElXpath') {/*TODO: use array*/
          this[key] = store[key];
        }
      }
    });
  }

  getFileTriggerHandler(fileData: IFileData) {
    this.getFileTrigger$.emit(fileData.path);
    this._componentfiles = [fileData];
    this.keyOptions = [];
    this.patchForm(this.headerForm, {fileName: fileData.name});
    this.showSearchPanel = false;
    this.changeDetectorRef.detectChanges();
  }

  pathChangedHandler($event) {
    this.path = $event;
    /*for some reason following detection doesnt trigger ngDoCheck
    * So patching store manually
    * */
    StoreService.patchStore(UtilityService.extractStoreData(this));
    this.changeDetectorRef.detectChanges();
  }

  patchForm(form: FormGroup, obj: IHeaderFormData) {
    debugger;
    form.patchValue(obj);
  }

  logCurrentData() {
    console.log(this.componentObj);
  }

  ngDoCheck(): void {
    StoreService.patchStore(UtilityService.extractStoreData(this));
  }

  addDoCheckHook(component) {
    let ngDoCheck = component.constructor.prototype.ngDoCheck;
    if (ngDoCheck && !ngDoCheck.__NGBUBBLE_HOOK__) {
      component.constructor.prototype.ngDoCheck = this.ngDoCheckHook(component.constructor.prototype.ngDoCheck);
    }
  }

  ngDoCheckHook(originalNgDoCheck: Function) {
    let self = this;
    return function () {
      self.codeData = {...self.componentObj};
      //
      // self.changeDetectorRef.detectChanges();
      // self.getHoveredComponentData$.emit();/*TODO: what about selected component via dblclick?*/
      // self.codeData = self.componentObj;
      // this.__NGBUBBLE_HOOK__ = true;

      /**/
      originalNgDoCheck && originalNgDoCheck();/*TODO: ng do check with arguments?*/
    };
  }

  hideSearchPanel() {
    this.showSearchPanel = false;
    StoreService.patchStore(UtilityService.extractStoreData(this));
    this.changeDetectorRef.detectChanges();
  }

  onResizeEnd($event, editorLeft, editorRight, editorWrapperBody: HTMLElement) {
    let left = Math.abs($event.rectangle.right - $event.rectangle.left);
    left = left < 100 ? 100 : left;/*left should be atleast 10px*/
    let total: number = Number(editorWrapperBody.getBoundingClientRect().width);
    editorLeft.style.width = `${left * 100 / total}%`;
    editorRight.style.width = `${(total - left) * 100 / total}%`;
    this.changeDetectorRef.detectChanges();
  }

  test(el) {
    this.changeDetectorRef.detectChanges();
  }


  maximize(doMaximize:boolean) {
    this.minimize = !doMaximize;
    this.changeDetectorRef.detectChanges();
    StoreService.patchStore(UtilityService.extractStoreData(this));
  }

}
