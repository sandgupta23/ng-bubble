import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {sideBaseClasses, UtilityService} from '../utility.service';
import {FormGroup} from '@angular/forms';
import {EventService} from '../event.service';
import {IFileData} from './file-search-panel/file-search-panel.component';
import {ClientService} from '../client.service';
import {AppEditorComponent} from './app-editor/app-editor.component';
import {StoreService} from '../store.service';
import {ILocalConfig, IStore} from '../interface';
import {EHeaderFormDataKeys} from './editor-header/editor-header.component';


export interface IHeaderFormData {
  fileName?: string,
  key?: string
}

@Component({
  selector: 'app-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit, AfterViewInit, DoCheck {

  @Output() file_save_start$ = new EventEmitter();
  @Output() searchTrigger$ = new EventEmitter();
  @Output() getFileTrigger$ = new EventEmitter();
  @Output() getSelectedComponentFiles$ = new EventEmitter();
  @Output() getHoveredComponentData$ = new EventEmitter();
  @Output() log$ = new EventEmitter();
  @Output() openInIde$ = new EventEmitter();

  @Input() set componentfiles(val: string) {
    this._componentfiles = JSON.parse(val);
    if (Array.isArray(this._componentfiles) && this._componentfiles.length > 0 && !this._componentfiles.find((key) => key === this.headerForm.value['fileName'])) {
      setTimeout(() => this.patchForm(this.headerForm,{fileName: this._componentfiles[0].name}));
    }
  }

  @Input() set componentstr(val: string) {
    this._componentstr = val;
    this.componentObj = JSON.parse(this._componentstr) || {};
    let activeComponentKey = this.headerForm.value['key'];
    this.keyOptions = ['All', ...Object.keys(this.componentObj)];
    let isActiveComponentKeyPresent = this.keyOptions.findIndex((key) => key === activeComponentKey) !== -1;
    if (!isActiveComponentKeyPresent || 'All' === activeComponentKey) {
      setTimeout(() => this.patchForm(this.headerForm, {key: 'All'}));
      this.codeData = this.componentObj;
    } else {
      this.codeData = {[activeComponentKey]: this.componentObj [activeComponentKey]};
    }
  }

  @Input() set coords(coordsStr) {
    //console.log(coordsStr);
    let coords = JSON.parse(coordsStr);
    let top = coords.top + 'px';
    let left = coords.left + 'px';
    this._coords = {...coords, left, top};
    this.showTooltip = true;
  }

  @Input() set searchfiles(val: string) {
    EventService.searchResultsFinish$.emit(val);
  }

  @Input() set filecontent(val: string) {
    if (val && this.activeHeaderTab === EHeaderFormDataKeys.fileName) this.codeData = val;
  }

  @Input() config;
  @ViewChild(AppEditorComponent) appEditorComponent: AppEditorComponent;
  @ViewChildren('menu') menu: QueryList<any>;

  minimize = false;
  expand = false;
  _componentfiles: IFileData[];
  _componentstr: string;
  showSearchPanel = false;
  showTooltip = false;
  top = '50vh';
  left = '50vw';
  _coords: { top: string, left: string, componentName: string, tagName: string };
  right = '0';
  bottom = '0';
  activeHeaderTab: EHeaderFormDataKeys = null;
  shouldFoldCode = true;
  componentObj: object = {};
  keyOptions = ['All'];
  myObject = Object;
  codeData: any = 'hello from wrapper';
  headerForm: FormGroup;
  headerFormData: IHeaderFormData = {};
  constructor(private utilityService: UtilityService) {}

  ngOnInit() {
    console.log("editor-wrapper.component.ts");
    StoreService.init();
    let store = StoreService.getStoreValue();
    this.initializeComponent(store);
    this.headerForm = this.utilityService.getHeaderForm();
    this.patchForm(this.headerForm, this.headerFormData);
    this.headerForm.valueChanges.subscribe((value) => {
      let changedKeys = <EHeaderFormDataKeys[]>UtilityService.getChangedKey(value, this.headerFormData);
      if (!(changedKeys.length == 0 || changedKeys.length > 2)) {
        this.activeHeaderTab = changedKeys[0];
      }
      this.headerFormData = value;
    });

  }

  headerDataChangedHandler(headerData: IHeaderFormData) {
    let key = Object.keys(headerData)[0];
    if ('key' === key) this.codeData = UtilityService.getCodeText(headerData, this.componentObj);
    else {
      let fileName = headerData[key];
      let filePath = this._componentfiles.find((file) => file.name === fileName).path;
      this.getFileTrigger$.emit(filePath);
    }
  }

  getFilePathByName(componentfiles: IFileData[], fileName) {
    return componentfiles.find((file) => file.name === fileName).path;
  }

  sidebarActionHandler(clickEvent: Event) {
    let className = UtilityService.getClickedSideBarIcon(clickEvent);
    switch (className) {
      case 'vs-code-grey' : {
        let path = this.getFilePathByName(this._componentfiles, this.headerForm.get('fileName').value);
        this.openInIde$.emit({pathToOpen: path});
        break;
      }
      case 'fa-search' : {
        setTimeout(() => {
          /*todo: hack...issues with clickoutside*/
          this.showSearchPanel = !this.showSearchPanel;
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
        UtilityService.unfoldCode(this.appEditorComponent.codemirror);
        break;
      }
      case 'fa-angle-double-down' : {
        this.shouldFoldCode = true;
        UtilityService.foldCode(this.appEditorComponent.codemirror);
        break;
      }
      case 'fa-file' : {
        this.activeHeaderTab = EHeaderFormDataKeys.fileName;
        this.headerDataChangedHandler({fileName: this.headerFormData.fileName});
        break;
      }
      case 'fa-code' : {

        this.headerDataChangedHandler({key: this.headerFormData.key});
        this.activeHeaderTab = EHeaderFormDataKeys.key;
        break;
      }
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
      case 'menu__item-html' : {
        this.openInIde(this._coords.componentName, 'html');
        break;
      }
      case 'menu__item-ts' : {
        debugger;
        this.openInIde(this._coords.componentName, 'ts');
        break;
      }
      case 'menu__item-data' : {

        this.getSelectedComponentFiles$.emit();
        this.getHoveredComponentData$.emit();
        break;
      }
      case 'menu__item-ide' : {
        alert('ide');
        break;
      }
    }

  }

  openInIde(componentName: string, ext: string) {
    // this.openInIde$.emit({tagName: tag, ext});
    this.openInIde$.emit({searchTerm: componentName+ext});
  }


  ngAfterViewInit(): void {
    setTimeout(() => {/*TODO: hack. @output events dont work without settimeout*/
      console.log(this.menu);
      try {
        ClientService.init();

        if (this.activeHeaderTab === EHeaderFormDataKeys.key) {
          this.getHoveredComponentData$.emit();
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }

  ngDoCheck(): void {
    StoreService.patchStore(UtilityService.extractStoreData(this));
  }

  initializeComponent(store: IStore) {
    Object.keys(store).forEach((key) => {
      if (typeof store[key] !== 'function') {
        this[key] = store[key];
      }
    });
  }

  getFileTriggerHandler(fileData: IFileData) {
    this.getFileTrigger$.emit(fileData.path);
    this._componentfiles = [fileData];
    this.keyOptions = [];
    this.patchForm(this.headerForm, {fileName: fileData.name});
  }

  patchForm(form:FormGroup, obj: IHeaderFormData) {
    form.patchValue(obj);
  }
  //
  logCurrentData() {
    this.log$.emit({key: this.headerFormData.key, clone: this.componentObj});
  }

}
