import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
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
import {ClientService} from '../client/client.service';
import {JsbEditorComponent} from './jsb-editor/jsb-editor.component';
import {StoreService} from '../store.service';
import {ICoords, IStore} from '../interface';
import {EHeaderFormDataKeys} from './editor-header/editor-header.component';
import {INgProbeData} from '../client/interface';
import {debounceTime} from 'rxjs/operators';
import {EDataCy} from '../data-cy';

// import {MockDataService} from './mockDataService';


export interface IHeaderFormData {
  fileName?: string;
  key?: string;
  editorMode?: string;
}

// @ts-ignore
@Component({
  selector: 'jsb-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EditorWrapperComponent implements OnInit, AfterViewInit, DoCheck {

  @Input() set status(status: { connection: boolean }) {
    this._status = status;
    if (!status.connection) {
      this.fileData = 'NG:BUBBLE:: No connection with server. Please restart server using command `ng-bubble` in project root';
    }
  }

  myDataCy = EDataCy;


  constructor(private utilityService: UtilityService, private changeDetectorRef: ChangeDetectorRef) {
  }

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
  @Output() shutDown$ = new EventEmitter();

  @Input() isLoading = true;

  @ViewChild(JsbEditorComponent, {static: false}) appEditorComponent: JsbEditorComponent;
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
  _coords: ICoords;
  right = '0';
  bottom = '0';
  threeSecPassed = false;
  activeHeaderTab: EHeaderFormDataKeys = null;
  myEHeaderFormDataKeys = EHeaderFormDataKeys;
  shouldFoldCode = true;
  componentObj: object = {};
  keyOptions = ['All'];
  myObject = Object;
  codeData: any; // = MockDataService.codeData;
  fileData: any;
  path: any = '';
  headerForm: FormGroup;
  headerFormData: IHeaderFormData = {};
  BACKEND_IMG_ROOT = 'http://localhost:11637/assets/imgs/';
  length = 0;
  @Input() componentfiles = (val: IFileData[]) => {

    this._componentfiles = val;
    if (Array.isArray(this._componentfiles) && this._componentfiles.length > 0 && !this._componentfiles.find((key) => key === this.headerForm.value['fileName'])) {
      setTimeout(() => this.patchForm(this.headerForm, {fileName: this._componentfiles[0].name}));
    }
  }

  @Input() componentstr = (ngProbeData: INgProbeData, isInit: boolean = false) => {
    // console.log('componentstr')
    this.componentObj = ngProbeData.componentInstance;
    try {
      const instance_without_dependency = this.utilityService.pruneDependenciesFromInstance(ngProbeData.componentInstance);
      if (!isInit) {
        this.path = '';
      }

      const s = UtilityService.jsonStringifyCyclic({...instance_without_dependency, ...Object.getPrototypeOf(ngProbeData.componentInstance)});
      this.codeData = JSON.parse(s);
      StoreService.patchStore(UtilityService.extractStoreData(this)); // TODO: bad!
    } catch (e) {
      console.log(e);
    }
    this.changeDetectorRef.detectChanges();
  };

  @Input() coords = (coordsStr) => {

    const coords = coordsStr;
    const top = coords.top + 'px';
    const left = coords.left + 'px';
    this._coords = {...coords, left, top};

    this.showTooltip = true;
    StoreService.patchStore(UtilityService.extractStoreData(this)); // TODO: bad!
    this.changeDetectorRef.detectChanges();
  };

  @Input() searchfiles = (val: string) => {
    EventService.searchResultsFinish$.emit(val);
  };

  @Input() showTooltipAttr = (val: boolean) => {
    this.showTooltip = val;
    this.changeDetectorRef.detectChanges();
  };
  @Input() filecontent = (val: string) => {
    // LoggingService.log(val);
    this.fileData = val;
    // this.headerForm.patchValue({editorMode:true});
    this.changeDetectorRef.detectChanges();
  };


  @Input() config = (val) => {
    this._config = val;
    StoreService.config = val;
    this.changeDetectorRef.detectChanges();
  };


  ngOnInit() {
    this.keySearchKeywordChanged$.pipe(debounceTime(500)).subscribe((keySearchKeyword: string) => {
      this.keySearchKeyword = keySearchKeyword;
      this.changeDetectorRef.detectChanges();
    });
    StoreService.init();
    const store = StoreService.getStoreValue();
    this.initializeComponent(store);
    this.headerForm = this.utilityService.getHeaderForm();

    this.patchForm(this.headerForm, this.headerFormData);
    this.headerForm.valueChanges.subscribe((value) => {

      this.headerFormData = value;
      this.editorMode = this.headerFormData.editorMode;
      StoreService.patchStore(UtilityService.extractStoreData(this));
      this.changeDetectorRef.detectChanges();
    });
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.threeSecPassed = true;
      this.changeDetectorRef.detectChanges();
    }, 3000);
  }


  /*
  * headerDataChangedHandler:
  * is called when form header files select are changed by (headerDataChanged$)
  * Will trigger an event to get selected file
  * */
  headerDataChangedHandler(headerData: IHeaderFormData) {
    const key = Object.keys(headerData)[0];
    if ('key' === key) {
      this.codeData = UtilityService.getCodeText(headerData, this.componentObj);
    } else {
      const fileName = headerData[key];
      const filePath = this._componentfiles.find((file) => file.name === fileName).path;
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


    const dataCyVal: EDataCy = UtilityService.getDataCyVal(event);
    switch (dataCyVal) {
      case EDataCy.sidebar_ide : {
        const path = this.getFilePathByName(this._componentfiles, this.headerForm.get('fileName').value);
        console.log("=====================================");
        this.openInIde$.emit({pathToOpen: path});
        break;
      }
      case EDataCy.sidebar_search : {
        event.stopPropagation();
        setTimeout(() => {
          /*todo: hack...issues with clickoutside*/
          this.showSearchPanel = !this.showSearchPanel;
          this.changeDetectorRef.detectChanges();
          StoreService.patchStore(UtilityService.extractStoreData(this));
        });
        break;
      }
      case EDataCy.sidebar_refresh : {
        this.getSelectedComponentFiles$.emit();
        this.getHoveredComponentData$.emit();
        break;
      }
      case EDataCy.sidebar_log : {
        this.logCurrentData();
        break;
      }
      case EDataCy.header_toggle_expand : {
        this.left = '15vw';
        this.top = '15vh';
        this.right = '0';
        this.bottom = '0';
        this.minimize = false;
        this.expand = true;
        break;
      }

      case EDataCy.sidebar_off : {
        this.shutDown$.emit();
        break;
      }
      case EDataCy.sidebar_unfold : {
        this.shouldFoldCode = false;
        EventService.foldCodeInCodemirror$.emit(this.shouldFoldCode);
        break;
      }
      case EDataCy.sidebar_fold : {
        this.shouldFoldCode = true;
        EventService.foldCodeInCodemirror$.emit(this.shouldFoldCode);
        break;
      }
      case EDataCy.header_toggle_reset : {

        this.left = '50vw';
        this.top = '50vh';
        this.right = '0';
        this.bottom = '0';
        this.expand = false;
        break;
      }
      case EDataCy.header_toggle_minimize : {
        this.minimize = true;
        break;
      }

      /*menu items*/
      case EDataCy.menu_ts : {
        this.openInIde(this._coords.componentName, 'ts', this._coords.componentNode);
        break;
      }
      case EDataCy.menu_show_data : {

        this.getSelectedComponentFiles$.emit();
        this.getHoveredComponentData$.emit();
        this.minimize = false;
        break;
      }
    }
  }

  openInIde(componentName: string, ext: string, $node: EventTarget) {
    this.openInIde$.emit({node: $node});
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
        // console.error(e);
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

    form.patchValue(obj);
  }

  logCurrentData() {
    console.info(this.componentObj);
  }

  ngDoCheck(): void {
    StoreService.patchStore(UtilityService.extractStoreData(this));
  }

  addDoCheckHook(component) {
    const ngDoCheck = component.constructor.prototype.ngDoCheck;
    if (ngDoCheck && !ngDoCheck.__NGBUBBLE_HOOK__) {
      component.constructor.prototype.ngDoCheck = this.ngDoCheckHook(component.constructor.prototype.ngDoCheck);
    }
  }

  ngDoCheckHook(originalNgDoCheck: Function) {
    const self = this;
    return function () {
      self.codeData = {...self.componentObj};
      //
      // self.changeDetectorRef.detectChanges();
      // self.getHoveredComponentData$.emit();/*TODO: what about selected component via dblclick?*/
      // self.codeData = self.componentObj;
      // this.__NGBUBBLE_HOOK__ = true;

      /**/
      if (originalNgDoCheck) {
        originalNgDoCheck();
      } /*TODO: ng do check with arguments?*/
    };
  }

  hideSearchPanel() {
    this.showSearchPanel = false;
    StoreService.patchStore(UtilityService.extractStoreData(this));
    this.changeDetectorRef.detectChanges();
  }

  onResizeEnd($event, editorLeft, editorRight, editorWrapperBody: HTMLElement) {
    let left = Math.abs($event.rectangle.right - $event.rectangle.left);
    left = left < 100 ? 100 : left; /*left should be atleast 10px*/
    const total: number = Number(editorWrapperBody.getBoundingClientRect().width);
    editorLeft.style.width = `${left * 100 / total}%`;
    editorRight.style.width = `${(total - left) * 100 / total}%`;
    this.changeDetectorRef.detectChanges();
  }

  test(el) {
    this.changeDetectorRef.detectChanges();
  }


  maximize(doMaximize: boolean) {
    this.minimize = !doMaximize;
    this.changeDetectorRef.detectChanges();
    StoreService.patchStore(UtilityService.extractStoreData(this));
  }

}
