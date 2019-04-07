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


export interface IHeaderFormData {
  fileName?: string,
  key?: string,
  editorMode?: string,
}

@Component({
  selector: 'jsb-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EditorWrapperComponent implements OnInit, AfterViewInit, DoCheck {
  obj;
  editorMode;
  _status:{connection:boolean};
  @Output() file_save_start$ = new EventEmitter();
  @Output() searchTrigger$ = new EventEmitter();
  @Output() getFileTrigger$ = new EventEmitter();
  @Output() getSelectedComponentFiles$ = new EventEmitter();
  @Output() getHoveredComponentData$ = new EventEmitter();
  @Output() log$ = new EventEmitter();
  @Output() openInIde$ = new EventEmitter();

  @Input() set status(status:{connection:boolean}){
    this._status = status;
    if(!status.connection){
      this.fileData = 'No connection with server. Please restart server using command `ng-bubble` in project root';
    }
  };
  @Input() componentfiles = (val: IFileData[]) => {

    this._componentfiles = val;
    if (Array.isArray(this._componentfiles) && this._componentfiles.length > 0 && !this._componentfiles.find((key) => key === this.headerForm.value['fileName'])) {
      setTimeout(() => this.patchForm(this.headerForm,{fileName: this._componentfiles[0].name}));
    }
  }

  @Input() componentstr = (ngProbeData: INgProbeData, isInit:boolean=false) => {
    // this._componentstr = val;
    // this.componentObj = UtilityService.getComponentWithoutInjectedMembers(ngProbeData) || {};
    this.componentObj = ngProbeData.componentInstance;
    if(!isInit){
      this.path = "";
    }
    //.constructor.prototype.ngDoCheck
    this.addDoCheckHook(ngProbeData.componentInstance);
    console.log('====>',this.componentObj);
    let activeComponentKey = this.headerForm.value['key'];
    this.keyOptions = ['All', ...Object.keys(this.componentObj)];
    let isActiveComponentKeyPresent = this.keyOptions.findIndex((key) => key === activeComponentKey) !== -1;
    if (!isActiveComponentKeyPresent || 'All' === activeComponentKey) {
      setTimeout(() => this.patchForm(this.headerForm, {key: 'All'}));
      this.codeData = this.componentObj;
    } else {
      this.codeData = {[activeComponentKey]: this.componentObj [activeComponentKey]};
    }
    StoreService.patchStore(UtilityService.extractStoreData(this));//TODO: bad!
    this.changeDetectorRef.detectChanges();
  }

  @Input() coords = (coordsStr) => {
    //console.log(coordsStr);
    let coords = coordsStr;
    let top = coords.top + 'px';
    let left = coords.left + 'px';
    this._coords = {...coords, left, top};

    this.showTooltip = true;
    StoreService.patchStore(UtilityService.extractStoreData(this));//TODO: bad!
    this.changeDetectorRef.detectChanges();
  }

  @Input() searchfiles = (val: string) => {
    EventService.searchResultsFinish$.emit(val);
  };

  @Input() filecontent = (val: string) => {

    this.fileData = val;
    // this.headerForm.patchValue({editorMode:true});
    this.changeDetectorRef.detectChanges();
  };

  @Input() config;
  @ViewChild(JsbEditorComponent) appEditorComponent: JsbEditorComponent;
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
  myEHeaderFormDataKeys = EHeaderFormDataKeys;
  shouldFoldCode = true;
  componentObj: object = {};
  keyOptions = ['All'];
  myObject = Object;
  codeData: any = {
    "dialogRefWrapper": {
      "ref": null
    },
    "utilityService": {
      "router": {
        "urlSerializer": "-pruned-",
        "rootContexts": "-pruned-",
        "location": "-pruned-",
        "config": "-pruned-",
        "lastSuccessfulNavigation": "-pruned-",
        "currentNavigation": null,
        "navigationId": 1,
        "isNgZoneEnabled": true,
        "events": "-pruned-",
        "navigated": true,
        "lastSuccessfulId": 1,
        "hooks": "-pruned-",
        "urlHandlingStrategy": "-pruned-",
        "routeReuseStrategy": "-pruned-",
        "onSameUrlNavigation": "ignore",
        "paramsInheritanceStrategy": "emptyOnly",
        "urlUpdateStrategy": "deferred",
        "relativeLinkResolution": "legacy",
        "ngModule": "-pruned-",
        "console": "-pruned-",
        "currentUrlTree": "-pruned-",
        "rawUrlTree": "-pruned-",
        "browserUrlTree": "-pruned-",
        "configLoader": "-pruned-",
        "routerState": "-pruned-",
        "transitions": "-pruned-",
        "navigations": "-pruned-",
        "locationSubscription": "-pruned-"
      },
      "snackBar": {
        "_overlay": "-pruned-",
        "_live": "-pruned-",
        "_injector": "-pruned-",
        "_breakpointObserver": "-pruned-",
        "_parentSnackBar": null,
        "_defaultConfig": "-pruned-",
        "_snackBarRefAtThisLevel": null
      },
      "activatedRoute": {
        "url": "-pruned-",
        "params": "-pruned-",
        "queryParams": "-pruned-",
        "fragment": "-pruned-",
        "data": "-pruned-",
        "outlet": "primary",
        "_futureSnapshot": "-pruned-",
        "snapshot": "-pruned-",
        "_routerState": "-pruned-"
      },
      "formBuilder": {},
      "storeVariableService": {
        "store": "-pruned-",
        "storeState": "-pruned-"
      },
      "refreshCodeEditor$": {
        "_isScalar": false,
        "observers": "-pruned-",
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null,
        "__isAsync": false
      },
      "RANDOM_IMAGE_URLS": [
        "https://robohash.org/StarDroid.png",
        "https://cdn-images-1.medium.com/max/327/1*paQ7E6f2VyTKXHpR-aViFg.png",
        "https://robohash.org/SmartDroid.png",
        "https://robohash.org/SilverDroid.png",
        "https://robohash.org/IntelliBot.png",
        "https://robohash.org/SmartBot.png",
        "https://robohash.org/SilverDroid.png",
        "https://robohash.org/SilverDroid.png"
      ],
      "masterIntegration_IntegrationKeyDisplayNameMap": null
    },
    "chatService": {
      "store": {
        "_ngZone": "-pruned-",
        "_stateStream": "-pruned-",
        "_internalStateOperations": "-pruned-"
      },
      "serverService": {
        "httpClient": "-pruned-",
        "utilityService": "-pruned-",
        "store": "-pruned-",
        "router": "-pruned-",
        "permissionService": "-pruned-",
        "constantsService": "-pruned-",
        "X_AXIS_TOKEN": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImlkIjo0fQ.Q4zn6_iHYH4zc4WL0WUeRAFPCXqwdEzAmxv7KwO35J0",
        "AUTH_TOKEN": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImlkIjoxMDQxNywidXNlcl9pZCI6NCwiZW50ZXJwcmlzZV9pZCI6NCwicm9sZV9pZCI6Mn0.Fq49y5alu8Iz5VNF6dS2XeStAoBPU2JJHESCI2sI30E",
        "isLoggedIn": false,
        "__loggeduser$__selector": "-pruned-",
        "__app$__selector": "-pruned-",
        "roleName": "Admin",
        "roleInfo": "-pruned-"
      },
      "utilityService": "-pruned-",
      "constantsService": {
        "NEW_BOT_VERSION_TEMPLATE": "-pruned-",
        "BACKEND_URL": "https://dev.imibot.ai/",
        "BACKEND_URL_LOGIN": "https://dev.imibot.ai/api/v1/user/login/",
        "BACKEND_URL_ENTERPRISE_USERS": "https://dev.imibot.ai/users/enterprise/",
        "BACKEND_USER_UPDATE_URL": "https://dev.imibot.ai/user/",
        "BACKEND_USER_CODE_BASED_BOT_LIST": "https://dev.imibot.ai/integrations",
        "BACKEND_USER_PIPELINE_BASED_BOT_LIST": "https://dev.imibot.ai/api/v1/bot/",
        "CHANNEL_LIST": "-pruned-",
        "TIME_GRANULARITY_LIST": "-pruned-",
        "DATE_PICKER_CONFIG": "-pruned-",
        "LOCALSTORAGE_APP_STATE": "LOCALSTORAGE_APP_STATE",
        "LOCALSTORAGE_LAST_STATE_UPDATED": "LOCALSTORAGE_LAST_STATE_UPDATED",
        "HANDSON_TABLE_BOT_TESTING_colHeaders": "-pruned-",
        "HANDSON_TABLE_BOT_TESTING_columns": "-pruned-",
        "HANDSON_TABLE_KNOWLEDGE_BASE_SETTING": "-pruned-",
        "HANDSON_TABLE_KNOWLEDGE_BASE_colHeaders": "-pruned-",
        "HANDSON_TABLE_KNOWLEDGE_BASE_columns": "-pruned-",
        "SMART_TABLE_REPORT_TABLE_DATA_META_DICT_TEMPLATE": "-pruned-",
        "SMART_TABLE_REPORT_HISTORY_TABLE_DATA_META_DICT_TEMPLATE": "-pruned-",
        "HIGHCHART_THEMEVALUE_ANALYTICS_PERFORMANCE_SESSION_WISE": "-pruned-",
        "HIGHCHART_THEMEVALUE_ANALYTICS_PERFORMANCE_TEMPLATE_KEY_AND_FLOW_TRIGGERED": "-pruned-",
        "SMART_TABLE_ENTERPRISE_NER_TABLE_DATA_META_DICT_TEMPLATE": "-pruned-",
        "SMART_TABLE_BOT_KNOWLEDGE_BASE_NER_TABLE_DATA_META_DICT_TEMPLATE": "-pruned-",
        "SMART_TABLE_SESSION_TABLE_DATA_META_DICT_TEMPLATE": "-pruned-",
        "SMART_TABLE_ENTERPISE_USERS_SETTING": "-pruned-",
        "SMART_TABLE_SERVICE_KEY_EXPIRED": "-pruned-",
        "SMART_TABLE_SERVICE_KEY_ACTIVE": "-pruned-",
        "SMART_TABLE_USER_DICT_TEMPLATE": "-pruned-",
        "SMART_TABLE_CONSUMER_TABLE_DATA_META_DICT_TEMPLATE": "-pruned-",
        "__app$__selector": "-pruned-",
        "__loggeduser$__selector": "-pruned-",
        "appState": "-pruned-",
        "loggedUser": "-pruned-",
        "allowedPermissionIdsToCurrentRole": "-pruned-"
      }
    },
    "activatedRoute": {
      "url": {
        "_isScalar": false,
        "observers": "-pruned-",
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null,
        "_value": "-pruned-"
      },
      "params": {
        "_isScalar": false,
        "observers": "-pruned-",
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null,
        "_value": "-pruned-"
      },
      "queryParams": {
        "_isScalar": false,
        "observers": "-pruned-",
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null,
        "_value": "-pruned-"
      },
      "fragment": {
        "_isScalar": false,
        "observers": "-pruned-",
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null,
        "_value": null
      },
      "data": {
        "_isScalar": false,
        "observers": "-pruned-",
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null,
        "_value": "-pruned-"
      },
      "outlet": "primary",
      "_futureSnapshot": {
        "url": "-pruned-",
        "params": "-pruned-",
        "queryParams": "-pruned-",
        "fragment": null,
        "data": "-pruned-",
        "outlet": "primary",
        "routeConfig": "-pruned-",
        "_urlSegment": "-pruned-",
        "_lastPathIndex": 2,
        "_resolve": "-pruned-",
        "_routerState": "-pruned-",
        "_resolvedData": "-pruned-",
        "_queryParamMap": "-pruned-"
      },
      "_routerState": {
        "_root": "-pruned-",
        "snapshot": "-pruned-"
      },
      "snapshot": "-pruned-"
    },
    "router": "-pruned-",
    "constantsService": "-pruned-",
    "serverService": "-pruned-",
    "matDialog": {
      "_overlay": {
        "scrollStrategies": "-pruned-",
        "_overlayContainer": "-pruned-",
        "_componentFactoryResolver": "-pruned-",
        "_positionBuilder": "-pruned-",
        "_keyboardDispatcher": "-pruned-",
        "_injector": "-pruned-",
        "_ngZone": "-pruned-",
        "_document": "-pruned-",
        "_directionality": "-pruned-",
        "_location": "-pruned-"
      },
      "_injector": {
        "_parent": "-pruned-",
        "_bootstrapComponents": "-pruned-",
        "_def": "-pruned-",
        "_destroyListeners": "-pruned-",
        "_destroyed": false,
        "injector": "-pruned-",
        "_providers": "-pruned-"
      },
      "_location": {
        "_subject": "-pruned-",
        "_platformStrategy": "-pruned-",
        "_baseHref": ""
      },
      "_defaultOptions": null,
      "_parentDialog": {
        "_overlay": "-pruned-",
        "_injector": "-pruned-",
        "_location": "-pruned-",
        "_defaultOptions": null,
        "_parentDialog": "-pruned-",
        "_overlayContainer": "-pruned-",
        "_openDialogsAtThisLevel": "-pruned-",
        "_afterAllClosedAtThisLevel": "-pruned-",
        "_afterOpenedAtThisLevel": "-pruned-",
        "_ariaHiddenElements": "-pruned-",
        "afterAllClosed": "-pruned-"
      },
      "_overlayContainer": {
        "_document": "-pruned-",
        "_containerElement": "-pruned-"
      },
      "_openDialogsAtThisLevel": [],
      "_afterAllClosedAtThisLevel": {
        "_isScalar": false,
        "observers": "-pruned-",
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null
      },
      "_afterOpenedAtThisLevel": {
        "_isScalar": false,
        "observers": "-pruned-",
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null
      },
      "_ariaHiddenElements": {},
      "afterAllClosed": {
        "_isScalar": false
      }
    },
    "store": "-pruned-",
    "showLoader": false,
    "doStartBlinking": false,
    "myEAllActions": {
      "Get Bots": "Get Bots",
      "Create Bots": "Create Bots",
      "Update Bots": "Update Bots",
      "Delete Bots": "Delete Bots",
      "Get Bots Anonymous": "Get Bots Anonymous",
      "Get Enterprise Knowledge base": "Get Enterprise Knowledge base",
      "Create Enterprise Knowledge base": "Create Enterprise Knowledge base",
      "Update Enterprise Knowledge base": "Update Enterprise Knowledge base",
      "Delete Enterprise Knowledge base": "Delete Enterprise Knowledge base",
      "Create Bot Versioning": "Create Bot Versioning",
      "GET Bot Versioning": "GET Bot Versioning",
      "Update Bot Versioning": "Update Bot Versioning",
      "Delete Bot Versioning": "Delete Bot Versioning",
      "Create Role": "Create Role",
      "Get Role": "Get Role",
      "Update Role": "Update Role",
      "Delete Role": "Delete Role",
      "Create User": "Create User",
      "Get User": "Get User",
      "Update User": "Update User",
      "Get Consumers": "Get Consumers",
      "Get Sessions": "Get Sessions",
      "Analytics": "Analytics",
      "Get Bot Testcases": "Get Bot Testcases",
      "Create Bot Testcases": "Create Bot Testcases",
      "Update Bot Testcases": "Update Bot Testcases",
      "Delete Bot Testcases": "Delete Bot Testcases",
      "Get Integrations": "Get Integrations",
      "Get Pipeline Module": "Get Pipeline Module",
      "Create Reports": "Create Reports",
      "Get Reports": "Get Reports",
      "Update Reports": "Update Reports",
      "Delete Reports": "Delete Reports",
      "Get Report History": "Get Report History",
      "Get Enterprise": "Get Enterprise",
      "Update Enterprise": "Update Enterprise",
      "Delete User": "Delete User",
      "Get Report Types": "Get Report Types",
      "Send API": "Send API",
      "Get Messages": "Get Messages",
      "Get Actions": "Get Actions",
      "Close Room": "Close Room",
      "agent_close": "agent_close",
      "Anonymize Conversation": "Anonymize Conversation",
      "Post dfRules Debug": "Post dfRules Debug",
      "Post genRules Debug": "Post genRules Debug",
      "Post genTemplate Debug": "Post genTemplate Debug",
      "Post Workflow Debug": "Post Workflow Debug",
      "Workflow Webhook": "Workflow Webhook",
      "Facebook Webhook": "Facebook Webhook",
      "Backward Compatible Message API": "Backward Compatible Message API",
      "Intelligence API Webhook": "Intelligence API Webhook",
      "Delete Consumer": "Delete Consumer",
      "Create Decrypt Audit": "Create Decrypt Audit",
      "erase consumer": "erase consumer",
      "Exec Reports": "Exec Reports",
      "Download Reports": "Download Reports",
      "Skype API": "Skype API",
      "Update Password": "Update Password",
      "Get Bot Knowledge base": "Get Bot Knowledge base",
      "Create Bot Knowledge base": "Create Bot Knowledge base",
      "Update Bot Knowledge base": "Update Bot Knowledge base",
      "Delete Bot Knowledge base": "Delete Bot Knowledge base",
      "ModuleDetail": "ModuleDetail"
    },
    "menuOpened": false,
    "bot": {
      "active_version": {
        "bot_id": 812,
        "comment": "Default Active Version",
        "id": 833,
        "version": 1
      },
      "active_version_id": 833,
      "advanced_data_protection": false,
      "allow_agent_handover": false,
      "allow_anonymization": false,
      "allow_feedback": false,
      "avatars": [
        "-pruned-"
      ],
      "blanket_consent": false,
      "bot_access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODEyLCJyb2xlIjoiYm90In0.4yudf8vOsNZ0hlcW-F3Xu76b222LxN4u2Piwrp9b-lA",
      "bot_metadata": {},
      "bot_type": "chatbot",
      "bot_unique_name": "testing bot new",
      "child_bots": [],
      "consent_categories": [
        "data_retention",
        "data_anonymization"
      ],
      "consent_message": "",
      "created_at": 1553243538000,
      "created_by": "Qwerty1 Parrot",
      "data_persistence_period": 30,
      "description": "Play Game and win Coupons",
      "enterprise_id": 4,
      "error_message": "",
      "first_message": "Hi.. Welcome to test world. I am testing bot.",
      "heading": "Welcome to the Game World",
      "id": 812,
      "integrations": {
        "ccsp_details": "-pruned-",
        "channels": "-pruned-"
      },
      "is_manager": false,
      "latest_version": {
        "_id": 812,
        "bot_id": 812,
        "comment": "Default Active Version",
        "id": 833,
        "version": 1
      },
      "logo": "https://cp-mlxprod-static.microsoft.com/013920-1003/en-us/thumbnail.png",
      "name": "testing 004",
      "old_id": "",
      "parent_bots": [],
      "pipelines": [
        "-pruned-",
        "-pruned-",
        "-pruned-",
        "-pruned-",
        "-pruned-"
      ],
      "resource_uri": "/api/v1/bot/812/",
      "room_close_callback": false,
      "room_persistence_time": 240,
      "transactions_per_pricing_unit": 0,
      "updated_at": 1553243538000,
      "updated_by": "Qwerty1 Parrot"
    },
    "parentRoute": "chatbot",
    "__loggeduserenterpriseinfo$__selector": {
      "_isScalar": false
    },
    "enterprise_unique_name": "ayeshreddy.k",
    "__chatsessionstate$__selector": {
      "_isScalar": false
    },
    "currentUid": null,
    "customConsumerDetails": null,
    "__loggeduser$__selector": {
      "_isScalar": false
    },
    "role": "Admin"
  };
  fileData: any = 'Loading...';
  path: any = '';
  headerForm: FormGroup;
  headerFormData: IHeaderFormData = {};
  constructor(private utilityService: UtilityService, private changeDetectorRef:ChangeDetectorRef) {}

  ngOnInit() {

    StoreService.init();
    let store = StoreService.getStoreValue();
    this.initializeComponent(store);
    this.headerForm = this.utilityService.getHeaderForm();

    this.patchForm(this.headerForm, this.headerFormData);
    this.headerForm.valueChanges.subscribe((value) => {
      // let changedKeys = <EHeaderFormDataKeys[]>UtilityService.getChangedKey(value, this.headerFormData);
      //
      // if (changedKeys[0]!==EHeaderFormDataKeys.editorMode && !(changedKeys.length == 0 || changedKeys.length > 2)) {
      //   this.activeHeaderTab = changedKeys[0];
      // }
      this.headerFormData = value;
      this.editorMode = this.headerFormData.editorMode;

      StoreService.patchStore(UtilityService.extractStoreData(this));
      this.changeDetectorRef.detectChanges();
    });
    this.changeDetectorRef.detectChanges();
  }

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

  sidebarActionHandler(clickEvent: Event) {

    setTimeout(()=>{
      this.changeDetectorRef.detectChanges();
      StoreService.patchStore(UtilityService.extractStoreData(this));
    });

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
        window.onload = function () {
          ClientService.init();
        };

        if (this.activeHeaderTab === EHeaderFormDataKeys.key) {
          this.getHoveredComponentData$.emit();
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  }


  initializeComponent(store: IStore) {
    Object.keys(store).forEach((key) => {
      if (typeof store[key] !== 'function') {
        if(key !== 'selectedElXpath' && key !== 'hoveredElXpath'){/*TODO: use array*/
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
    this.changeDetectorRef.detectChanges();
  }

  pathChangedHandler($event){
    this.path=$event;
    /*for some reason following detection doesnt trigger ngDoCheck
    * So patching store manually
    * */
    StoreService.patchStore(UtilityService.extractStoreData(this));
    this.changeDetectorRef.detectChanges();
  }

  patchForm(form:FormGroup, obj: IHeaderFormData) {
    form.patchValue(obj);
  }
  //
  logCurrentData() {
    this.log$.emit({key: this.headerFormData.key, clone: this.componentObj});
  }

  ngDoCheck(): void {
    StoreService.patchStore(UtilityService.extractStoreData(this));
  }

  addDoCheckHook(component){
    let ngDoCheck = component.constructor.prototype.ngDoCheck;
    if(ngDoCheck && !ngDoCheck.__NGBUBBLE_HOOK__){
      component.constructor.prototype.ngDoCheck = this.ngDoCheckHook(component.constructor.prototype.ngDoCheck);
    }
  }

  ngDoCheckHook(originalNgDoCheck:Function){
    let self = this;
    return function () {
      self.codeData = {...self.componentObj};
      // console.log(self.codeData);
      // self.changeDetectorRef.detectChanges();
      // self.getHoveredComponentData$.emit();/*TODO: what about selected component via dblclick?*/
      // self.codeData = self.componentObj;
      // this.__NGBUBBLE_HOOK__ = true;

      /**/ originalNgDoCheck && originalNgDoCheck();/*TODO: ng do check with arguments?*/
    }
  }

  @ViewChild('editor1', {read: ElementRef}) editor1:ElementRef;
  length = 0;
  onResizeEnd($event, el){
    console.log(this);
    console.log($event);
    el.style.width = `${Math.abs($event.rectangle.right - $event.rectangle.left)}px`;
    this.length = Math.abs($event.rectangle.right - $event.rectangle.left);
    this.changeDetectorRef.detectChanges();
    // let editor = document.getElementById('test2');
    // editor.style.left = `${event.rectangle.left}px`;
  }
  test(el){
    console.log(el);
    this.showSearchPanel = false;
    this.changeDetectorRef.detectChanges();
  }

}
