import {environment} from '../../environments/environment';


export class  MockDataService {
  static get codeData(){
    return environment.production? this._codeData: {};
  }

  private static _codeData = {
    "router": {
      "urlSerializer": {},
      "rootContexts": {
        "contexts": {}
      },
      "location": {
        "_subject": {
          "_isScalar": false,
          "observers": [
            {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": "-pruned-",
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": true,
              "isStopped": false,
              "destination": "-pruned-"
            }
          ],
          "closed": false,
          "isStopped": false,
          "hasError": false,
          "thrownError": null,
          "__isAsync": false
        },
        "_platformStrategy": {
          "_platformLocation": {
            "_doc": {
              "location": "-pruned-",
              "jQuery11010451442141302425": 1,
              "__zone_symbol__clickfalse": "-pruned-",
              "__zone_symbol__blurtrue": "-pruned-",
              "__zone_symbol__focustrue": "-pruned-",
              "__zone_symbol__keydownfalse": "-pruned-",
              "__zone_symbol__keyupfalse": "-pruned-",
              "__zone_symbol__dblclickfalse": "-pruned-",
              "__zone_symbol__mouseoverfalse": "-pruned-",
              "__zone_symbol__keydowntrue": "-pruned-",
              "__zone_symbol__mousedowntrue": "-pruned-",
              "__zone_symbol__touchstarttrue": "-pruned-"
            },
            "location": {
              "href": "http://localhost:4200/core/viewbots",
              "ancestorOrigins": "-pruned-",
              "origin": "http://localhost:4200",
              "protocol": "http:",
              "host": "localhost:4200",
              "hostname": "localhost",
              "port": "4200",
              "pathname": "/core/viewbots",
              "search": "",
              "hash": ""
            },
            "_history": {}
          },
          "_baseHref": "/"
        },
        "_baseHref": ""
      },
      "config": [
        {
          "path": "login",
          "canActivate": [
            null
          ]
        },
        {
          "path": "dev",
          "loadChildren": "./dev/dev.module#DevModule",
          "canLoad": []
        },
        {
          "path": "core",
          "loadChildren": "./core/core.module#CoreModule",
          "canLoad": [
            null
          ],
          "_loadedConfig": {
            "routes": [
              "-pruned-",
              "-pruned-",
              "-pruned-"
            ],
            "module": {
              "_parent": "-pruned-",
              "_bootstrapComponents": "-pruned-",
              "_def": "-pruned-",
              "_destroyListeners": "-pruned-",
              "_destroyed": false,
              "injector": "-pruned-",
              "_providers": "-pruned-"
            }
          }
        },
        {
          "path": "preview",
          "loadChildren": "./chat/chat.module#ChatModule",
          "_loadedConfig": {
            "routes": [
              "-pruned-"
            ],
            "module": {
              "_parent": "-pruned-",
              "_bootstrapComponents": "-pruned-",
              "_def": "-pruned-",
              "_destroyListeners": "-pruned-",
              "_destroyed": false,
              "injector": "-pruned-",
              "_providers": "-pruned-"
            }
          }
        },
        {
          "path": "denied"
        },
        {
          "path": "",
          "redirectTo": "core/viewbots",
          "pathMatch": "full"
        },
        {
          "path": "**"
        }
      ],
      "lastSuccessfulNavigation": {
        "id": 1,
        "initialUrl": {
          "root": {
            "segments": [],
            "children": {},
            "parent": null
          },
          "queryParams": {},
          "fragment": null
        },
        "extractedUrl": {
          "root": {
            "segments": [],
            "children": {
              "primary": "-pruned-"
            },
            "parent": null
          },
          "queryParams": {},
          "fragment": null
        },
        "trigger": "imperative",
        "extras": {
          "replaceUrl": true
        },
        "previousNavigation": null,
        "finalUrl": {
          "root": {
            "segments": [],
            "children": {
              "primary": "-pruned-"
            },
            "parent": null
          },
          "queryParams": "-pruned-",
          "fragment": null
        }
      },
      "currentNavigation": null,
      "navigationId": 1,
      "isNgZoneEnabled": true,
      "events": {
        "_isScalar": false,
        "observers": [
          {
            "closed": false,
            "_parent": {
              "closed": false,
              "_parent": "-pruned-",
              "_parents": null,
              "_subscriptions": "-pruned-",
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": true,
              "isStopped": false,
              "destination": "-pruned-",
              "concurrent": 1,
              "hasCompleted": false,
              "buffer": "-pruned-",
              "active": 0,
              "index": 1
            },
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": "-pruned-",
            "count": 29
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          },
          {
            "closed": false,
            "_parent": null,
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": {
              "closed": false,
              "_parent": null,
              "_parents": null,
              "_subscriptions": null,
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": false,
              "isStopped": false,
              "destination": "-pruned-",
              "_parentSubscriber": "-pruned-",
              "_context": "-pruned-"
            }
          }
        ],
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null
      },
      "navigated": true,
      "lastSuccessfulId": 1,
      "hooks": {},
      "urlHandlingStrategy": {},
      "routeReuseStrategy": {},
      "onSameUrlNavigation": "ignore",
      "paramsInheritanceStrategy": "emptyOnly",
      "urlUpdateStrategy": "deferred",
      "relativeLinkResolution": "legacy",
      "ngModule": {
        "_parent": {
          "parent": {
            "parent": {},
            "source": "Platform: core",
            "_records": {}
          },
          "source": "AppModule",
          "_records": {}
        },
        "_bootstrapComponents": [
          null
        ],
        "_def": {
          "isRoot": true,
          "providers": [
            {
              "index": 0,
              "deps": "-pruned-",
              "flags": 512
            },
            {
              "index": 1,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 2,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 3,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 4,
              "deps": "-pruned-",
              "flags": 5120
            },
            {
              "index": 5,
              "deps": "-pruned-",
              "flags": 5120
            },
            {
              "index": 6,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 7,
              "deps": "-pruned-",
              "flags": 6144,
              "value": null
            },
            {
              "index": 8,
              "deps": "-pruned-",
              "flags": 4608,
              "token": "-pruned-"
            },
            {
              "index": 9,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 10,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 11,
              "deps": "-pruned-",
              "flags": 135680
            },
            {
              "index": 12,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 13,
              "deps": "-pruned-",
              "flags": 5120
            },
            {
              "index": 14,
              "deps": "-pruned-",
              "flags": 5120
            },
            {
              "index": 15,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 16,
              "deps": "-pruned-",
              "flags": 5120
            },
            {
              "index": 17,
              "deps": "-pruned-",
              "flags": 6144,
              "value": null
            },
            {
              "index": 18,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 19,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 20,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 21,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 22,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 23,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 24,
              "deps": "-pruned-",
              "flags": 6144,
              "value": null
            },
            {
              "index": 25,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 26,
              "deps": "-pruned-",
              "flags": 6144,
              "value": null
            },
            {
              "index": 27,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 28,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 29,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 30,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 31,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 32,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 33,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 34,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 35,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 36,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 37,
              "deps": "-pruned-",
              "flags": 135680
            },
            {
              "index": 38,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 39,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 40,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 41,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 42,
              "deps": "-pruned-",
              "flags": 5120
            },
            {
              "index": 43,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 44,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 45,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            {
              "index": 46,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 47,
              "deps": "-pruned-",
              "flags": 4608
            },
            {
              "index": 48,
              "deps": "-pruned-",
              "flags": 5120
            },
            {
              "index": 49,
              "deps": "-pruned-",
              "flags": 4608
            }
          ],
          "modules": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          "providersByKey": {
            "ComponentFactoryResolver_10": "-pruned-",
            "InjectionToken LocaleId_11": "-pruned-",
            "NgLocalization_109": "-pruned-",
            "InjectionToken AppId_110": "-pruned-",
            "IterableDiffers_111": "-pruned-",
            "KeyValueDiffers_112": "-pruned-",
            "DomSanitizer_14": "-pruned-",
            "Sanitizer_113": "-pruned-",
            "InjectionToken HammerGestureConfig_19": "-pruned-",
            "InjectionToken EventManagerPlugins_22": "-pruned-",
            "EventManager_23": "-pruned-",
            "DomSharedStylesHost_24": "-pruned-",
            "DomRendererFactory2_27": "-pruned-",
            "AnimationDriver_25": "-pruned-",
            "AnimationStyleNormalizer_26": "-pruned-",
            "AnimationEngine_28": "-pruned-",
            "RendererFactory2_29": "-pruned-",
            "SharedStylesHost_114": "-pruned-",
            "Testability_115": "-pruned-",
            "AnimationBuilder_116": "-pruned-",
            "HttpXsrfTokenExtractor_31": "-pruned-",
            "HttpXsrfInterceptor_33": "-pruned-",
            "InjectionToken HTTP_INTERCEPTORS_117": "-pruned-",
            "BrowserXhr_34": "-pruned-",
            "XhrFactory_35": "-pruned-",
            "HttpXhrBackend_36": "-pruned-",
            "HttpBackend_37": "-pruned-",
            "HttpHandler_38": "-pruned-",
            "HttpClient_70": "-pruned-",
            "Overlay_45": "-pruned-",
            "InjectionToken cdk-connected-overlay-scroll-strategy_118": "-pruned-",
            "MutationObserverFactory_119": "-pruned-",
            "ErrorStateMatcher_120": "-pruned-",
            "RadioControlRegistry_121": "-pruned-",
            "InjectionToken mat-menu-scroll-strategy_122": "-pruned-",
            "InjectionToken mat-tooltip-scroll-strategy_123": "-pruned-",
            "InjectionToken mat-dialog-scroll-strategy_47": "-pruned-",
            "MatDialog_48": "-pruned-",
            "MatDatepickerIntl_124": "-pruned-",
            "InjectionToken mat-datepicker-scroll-strategy_125": "-pruned-",
            "DateAdapter_126": "-pruned-",
            "InjectionToken mat-select-scroll-strategy_127": "-pruned-",
            "MatPaginatorIntl_51": "-pruned-",
            "DateAdapter_128": "-pruned-",
            "SatDatepickerIntl_129": "-pruned-",
            "InjectionToken sat-datepicker-scroll-strategy_130": "-pruned-",
            "FormBuilder_131": "-pruned-",
            "LoginGaurdService_132": "-pruned-",
            "NgswCommChannel_55": "-pruned-",
            "SwPush_133": "-pruned-",
            "SwUpdate_134": {
              "index": 50,
              "deps": "-pruned-",
              "flags": 4608
            },
            "ActivatedRoute_67": {
              "index": 51,
              "deps": "-pruned-",
              "flags": 5120
            },
            "PreloadAllModules_56": {
              "index": 52,
              "deps": "-pruned-",
              "flags": 4608
            },
            "PreloadingStrategy_59": {
              "index": 53,
              "deps": "-pruned-",
              "flags": 6144,
              "value": null
            },
            "RouterPreloader_135": {
              "index": 54,
              "deps": "-pruned-",
              "flags": 135680
            },
            "NoPreloading_136": {
              "index": 55,
              "deps": "-pruned-",
              "flags": 4608
            },
            "RouterScroller_137": {
              "index": 56,
              "deps": "-pruned-",
              "flags": 136192
            },
            "InjectionToken Router Initializer_63": {
              "index": 57,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            "InjectionToken appBootstrapListener_138": {
              "index": 58,
              "deps": "-pruned-",
              "flags": 5120,
              "token": "-pruned-"
            },
            "Actions_139": {
              "index": 59,
              "deps": "-pruned-",
              "flags": 4608
            },
            "AuthStateReducer_140": {
              "index": 60,
              "deps": "-pruned-",
              "flags": 4608
            },
            "AppStateReducer_141": {
              "index": 61,
              "deps": "-pruned-",
              "flags": 4608
            },
            "EnterpriseprofileStateReducer_142": {
              "index": 62,
              "deps": "-pruned-",
              "flags": 4608
            },
            "ViewBotStateReducer_143": {
              "index": 63,
              "deps": "-pruned-",
              "flags": 4608
            },
            "ChatSessionStateReducer_144": {
              "index": 64,
              "deps": "-pruned-",
              "flags": 4608
            },
            "BotCreationStateReducer_145": {
              "index": 65,
              "deps": "-pruned-",
              "flags": 4608
            },
            "AnalysisStateReducer2_146": {
              "index": 66,
              "deps": "-pruned-",
              "flags": 4608
            },
            "ReportsStateReducer_147": {
              "index": 67,
              "deps": "-pruned-",
              "flags": 4608
            },
            "VersionStateReducer_148": {
              "index": 68,
              "deps": "-pruned-",
              "flags": 4608
            },
            "ServerService_149": {
              "index": 69,
              "deps": "-pruned-",
              "flags": 4608
            },
            "DragService_150": {
              "index": 70,
              "deps": "-pruned-",
              "flags": 4608
            },
            "DatePipe_151": {
              "index": 71,
              "deps": "-pruned-",
              "flags": 4608
            },
            "InjectionToken ROUTER_FORROOT_GUARD_87": {
              "index": 72,
              "deps": "-pruned-",
              "flags": 1024,
              "token": "-pruned-"
            },
            "ErrorHandler_75": {
              "index": 73,
              "deps": "-pruned-",
              "flags": 1024
            },
            "NgProbeToken_72": {
              "index": 74,
              "deps": "-pruned-",
              "flags": 1024
            },
            "RouterInitializer_62": {
              "index": 75,
              "deps": "-pruned-",
              "flags": 512
            },
            "InjectionToken NGSW_REGISTER_SCRIPT_73": {
              "index": 76,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "/static/ngsw-worker.js"
            },
            "RegistrationOptions_54": {
              "index": 77,
              "deps": "-pruned-",
              "flags": 256,
              "value": "-pruned-"
            },
            "InjectionToken Application Initializer_74": {
              "index": 78,
              "deps": "-pruned-",
              "flags": 1024,
              "token": "-pruned-"
            },
            "ApplicationInitStatus_76": {
              "index": 79,
              "deps": "-pruned-",
              "flags": 512
            },
            "ApplicationRef_81": {
              "index": 80,
              "deps": "-pruned-",
              "flags": 131584
            },
            "UrlSerializer_82": {
              "index": 81,
              "deps": "-pruned-",
              "flags": 512
            },
            "ChildrenOutletContexts_83": {
              "index": 82,
              "deps": "-pruned-",
              "flags": 512
            },
            "InjectionToken ROUTER_CONFIGURATION_61": {
              "index": 83,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "-pruned-"
            },
            "LocationStrategy_79": {
              "index": 84,
              "deps": "-pruned-",
              "flags": 1024
            },
            "Location_44": {
              "index": 85,
              "deps": "-pruned-",
              "flags": 512
            },
            "Compiler_58": {
              "index": 86,
              "deps": "-pruned-",
              "flags": 256,
              "value": "-pruned-"
            },
            "NgModuleFactoryLoader_57": {
              "index": 87,
              "deps": "-pruned-",
              "flags": 512
            },
            "InjectionToken ROUTES_84": {
              "index": 88,
              "deps": "-pruned-",
              "flags": 1024,
              "token": "-pruned-"
            },
            "Router_53": {
              "index": 89,
              "deps": "-pruned-",
              "flags": 132096
            },
            "RouterModule_152": {
              "index": 90,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "CommonModule_153": {
              "index": 91,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "ApplicationModule_154": {
              "index": 92,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "BrowserModule_88": {
              "index": 93,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "BrowserAnimationsModule_155": {
              "index": 94,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "InjectionToken ROOT_OPTIONS_89": {
              "index": 95,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "-pruned-"
            },
            "NgxsConfig_102": {
              "index": 96,
              "deps": "-pruned-",
              "flags": 1024
            },
            "InternalActions_64": {
              "index": 97,
              "deps": "-pruned-",
              "flags": 512
            },
            "InternalDispatchedActionResults_99": {
              "index": 98,
              "deps": "-pruned-",
              "flags": 512
            },
            "StateStream_100": {
              "index": 99,
              "deps": "-pruned-",
              "flags": 512
            },
            "InjectionToken USER_OPTIONS_90": {
              "index": 100,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-"
            },
            "InjectionToken NGXS_STORAGE_PLUGIN_OPTION_91": {
              "index": 101,
              "deps": "-pruned-",
              "flags": 1024,
              "token": "-pruned-"
            },
            "InjectionToken STORAGE_ENGINE_94": {
              "index": 102,
              "deps": "-pruned-",
              "flags": 1024,
              "token": "-pruned-"
            },
            "InjectionToken USER_OPTIONS_92": {
              "index": 103,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-"
            },
            "InjectionToken NGXS_DEVTOOLS_OPTIONS_95": {
              "index": 104,
              "deps": "-pruned-",
              "flags": 1024,
              "token": "-pruned-"
            },
            "InjectionToken LOGGER_USER_OPTIONS_93": {
              "index": 105,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "-pruned-"
            },
            "InjectionToken NGXS_LOGGER_PLUGIN_OPTIONS_96": {
              "index": 106,
              "deps": "-pruned-",
              "flags": 1024,
              "token": "-pruned-"
            },
            "InjectionToken NGXS_PLUGINS_98": {
              "index": 107,
              "deps": "-pruned-",
              "flags": 1024,
              "token": "-pruned-"
            },
            "PluginManager_97": {
              "index": 108,
              "deps": "-pruned-",
              "flags": 512
            },
            "InternalDispatcher_101": {
              "index": 109,
              "deps": "-pruned-",
              "flags": 512
            },
            "InternalStateOperations_103": {
              "index": 110,
              "deps": "-pruned-",
              "flags": 512
            },
            "StateContextFactory_105": {
              "index": 111,
              "deps": "-pruned-",
              "flags": 512
            },
            "StateFactory_104": {
              "index": 112,
              "deps": "-pruned-",
              "flags": 512
            },
            "Store_66": {
              "index": 113,
              "deps": "-pruned-",
              "flags": 512
            },
            "SelectFactory_106": {
              "index": 114,
              "deps": "-pruned-",
              "flags": 512
            },
            "InjectionToken ROOT_STATE_TOKEN_107": {
              "index": 115,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "-pruned-"
            },
            "NgxsRootModule_156": {
              "index": 116,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "NgxsStoragePluginModule_157": {
              "index": 117,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "NgxsModule_158": {
              "index": 118,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "NgxsReduxDevtoolsPluginModule_159": {
              "index": 119,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "NgxsLoggerPluginModule_160": {
              "index": 120,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "HttpClientXsrfModule_161": {
              "index": 121,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "HttpClientModule_162": {
              "index": 122,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "BidiModule_163": {
              "index": 123,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "PortalModule_164": {
              "index": 124,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "PlatformModule_165": {
              "index": 125,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "ScrollingModule_166": {
              "index": 126,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "OverlayModule_167": {
              "index": 127,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatCommonModule_16": {
              "index": 128,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatRippleModule_168": {
              "index": 129,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatButtonModule_169": {
              "index": 130,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatSnackBarModule_170": {
              "index": 131,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatProgressBarModule_171": {
              "index": 132,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "TextFieldModule_172": {
              "index": 133,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "ObserversModule_173": {
              "index": 134,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatFormFieldModule_174": {
              "index": 135,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatInputModule_175": {
              "index": 136,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatCheckboxModule_176": {
              "index": 137,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "InternalFormsSharedModule_177": {
              "index": 138,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "FormsModule_178": {
              "index": 139,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatMenuModule_179": {
              "index": 140,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "A11yModule_180": {
              "index": 141,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatTooltipModule_181": {
              "index": 142,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatTabsModule_182": {
              "index": 143,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatDialogModule_183": {
              "index": 144,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatIconModule_184": {
              "index": 145,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatButtonToggleModule_185": {
              "index": 146,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatChipsModule_186": {
              "index": 147,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatDatepickerModule_187": {
              "index": 148,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatDividerModule_188": {
              "index": 149,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "NativeDateModule_189": {
              "index": 150,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatNativeDateModule_190": {
              "index": 151,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatPseudoCheckboxModule_191": {
              "index": 152,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatOptionModule_192": {
              "index": 153,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatSelectModule_193": {
              "index": 154,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatSlideToggleModule_194": {
              "index": 155,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "CdkTableModule_195": {
              "index": 156,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatTableModule_196": {
              "index": 157,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatPaginatorModule_197": {
              "index": 158,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatProgressSpinnerModule_198": {
              "index": 159,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "NativeDateModule_199": {
              "index": 160,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "SatNativeDateModule_200": {
              "index": 161,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "SatDatepickerModule_201": {
              "index": 162,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "CdkAccordionModule_202": {
              "index": 163,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MatExpansionModule_203": {
              "index": 164,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "MyMaterialModule_204": {
              "index": 165,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "ReactiveFormsModule_205": {
              "index": 166,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "ClickOutsideModule_206": {
              "index": 167,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "SharedModule_207": {
              "index": 168,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "AuthModule_208": {
              "index": 169,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "ServiceWorkerModule_209": {
              "index": 170,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "AppModule_210": {
              "index": 171,
              "deps": "-pruned-",
              "flags": 1073742336
            },
            "InjectionToken The presence of this token marks an injector as being the root injector._211": {
              "index": 172,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": true
            },
            "InjectionToken AnimationModuleType_212": {
              "index": 173,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "BrowserAnimations"
            },
            "InjectionToken XSRF_COOKIE_NAME_30": {
              "index": 174,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "XSRF-TOKEN"
            },
            "InjectionToken XSRF_HEADER_NAME_32": {
              "index": 175,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "X-XSRF-TOKEN"
            },
            "InjectionToken mat-chips-default-options_213": {
              "index": 176,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "-pruned-"
            },
            "InjectionToken mat-date-formats_214": {
              "index": 177,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "-pruned-"
            },
            "InjectionToken mat-date-formats_215": {
              "index": 178,
              "deps": "-pruned-",
              "flags": 256,
              "token": "-pruned-",
              "value": "-pruned-"
            },
            "CodeInputService_69": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 179
            },
            "ConstantsService_65": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 180
            },
            "UtilityService_68": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 181
            },
            "MatSnackBar_216": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 182
            },
            "ScrollStrategyOptions_39": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 183
            },
            "ScrollDispatcher_217": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 184
            },
            "Platform_50": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 185
            },
            "ViewportRuler_218": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 186
            },
            "OverlayContainer_40": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 187
            },
            "OverlayPositionBuilder_41": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 188
            },
            "OverlayKeyboardDispatcher_42": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 189
            },
            "Directionality_43": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 190
            },
            "InjectionToken cdk-dir-doc_219": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 191,
              "token": "-pruned-"
            },
            "LiveAnnouncer_220": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 192
            },
            "InjectionToken liveAnnouncerElement_221": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 193,
              "token": "-pruned-"
            },
            "BreakpointObserver_222": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 194
            },
            "MediaMatcher_223": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 195
            },
            "InjectionToken mat-snack-bar-default-options_224": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 196,
              "token": "-pruned-"
            },
            "StoreVariableService_225": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 197
            },
            "PermissionService_71": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 198
            },
            "InjectionToken mat-sanity-checks_108": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 199,
              "token": "-pruned-"
            },
            "EventService_227": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 200
            },
            "StoreService_228": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 201
            },
            "InjectionToken mat-progress-bar-location_230": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 202,
              "token": "-pruned-"
            },
            "ViewportScroller_60": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 203
            },
            "AuthGaurdService_244": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 204
            },
            "AccessGaurdService_253": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 205
            },
            "ContentObserver_277": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 206
            },
            "InjectionToken MatInkBarPositioner_278": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 207,
              "token": "-pruned-"
            },
            "FocusMonitor_260": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 208
            },
            "InjectionToken mat-menu-default-options_285": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 209,
              "token": "-pruned-"
            },
            "MatIconRegistry_294": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 210
            },
            "InjectionToken mat-icon-location_295": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 211,
              "token": "-pruned-"
            },
            "AriaDescriber_292": {
              "flags": 136192,
              "deps": "-pruned-",
              "index": 212
            },
            "InjectionToken mat-tooltip-default-options_293": {
              "flags": 5120,
              "deps": "-pruned-",
              "index": 213,
              "token": "-pruned-"
            }
          }
        },
        "_destroyListeners": [
          null
        ],
        "_destroyed": false,
        "injector": "-pruned-",
        "_providers": [
          {
            "_parent": null,
            "_ngModule": "-pruned-",
            "_factories": {}
          },
          "en-US",
          null,
          null,
          {
            "factories": [
              "-pruned-"
            ]
          },
          {
            "factories": [
              "-pruned-"
            ]
          },
          {
            "_doc": "-pruned-"
          },
          "-pruned-",
          {
            "events": [
              "longpress",
              "slide",
              "slidestart",
              "slideend",
              "slideright",
              "slideleft"
            ],
            "overrides": {},
            "_hammerOptions": null
          },
          [
            {
              "_doc": "-pruned-",
              "ngZone": "-pruned-",
              "manager": "-pruned-"
            },
            {
              "_doc": "-pruned-",
              "manager": "-pruned-"
            },
            {
              "_doc": "-pruned-",
              "_config": "-pruned-",
              "console": "-pruned-",
              "loader": null,
              "manager": "-pruned-"
            }
          ],
          {
            "_zone": {
              "hasPendingMicrotasks": false,
              "hasPendingMacrotasks": true,
              "isStable": true,
              "onUnstable": "-pruned-",
              "onMicrotaskEmpty": "-pruned-",
              "onStable": "-pruned-",
              "onError": "-pruned-",
              "_nesting": 0,
              "_inner": "-pruned-",
              "_outer": "-pruned-"
            },
            "_eventNameToPlugin": {},
            "_plugins": [
              "-pruned-",
              "-pruned-",
              "-pruned-"
            ]
          },
          {
            "_stylesSet": {},
            "_doc": "-pruned-",
            "_hostNodes": {},
            "_styleNodes": {}
          },
          {
            "eventManager": "-pruned-",
            "sharedStylesHost": "-pruned-",
            "rendererByCompId": {},
            "defaultRenderer": {
              "eventManager": "-pruned-",
              "data": "-pruned-"
            }
          },
          {
            "_isNativeImpl": true,
            "_cssKeyframesDriver": {
              "_count": 0,
              "_head": "-pruned-",
              "_warningIssued": false
            }
          },
          {},
          {
            "bodyNode": {},
            "_driver": "-pruned-",
            "_triggerCache": {
              "c16-transformMenu": "-pruned-",
              "c16-fadeInItems": "-pruned-",
              "c12-translateTab": "-pruned-"
            },
            "_transitionEngine": {
              "bodyNode": "-pruned-",
              "driver": "-pruned-",
              "_normalizer": "-pruned-",
              "players": "-pruned-",
              "newHostElements": "-pruned-",
              "playersByElement": "-pruned-",
              "playersByQueriedElement": "-pruned-",
              "statesByElement": "-pruned-",
              "disabledNodes": "-pruned-",
              "totalAnimations": 148,
              "totalQueuedPlayers": 0,
              "_namespaceLookup": "-pruned-",
              "_namespaceList": "-pruned-",
              "_flushFns": "-pruned-",
              "_whenQuietFns": "-pruned-",
              "namespacesByHostElement": "-pruned-",
              "collectedEnterElements": "-pruned-",
              "collectedLeaveElements": "-pruned-"
            },
            "_timelineEngine": {
              "bodyNode": "-pruned-",
              "_driver": "-pruned-",
              "_normalizer": "-pruned-",
              "_animations": "-pruned-",
              "_playersById": "-pruned-",
              "players": "-pruned-"
            }
          },
          {
            "delegate": "-pruned-",
            "engine": "-pruned-",
            "_zone": "-pruned-",
            "_currentId": 75,
            "_microtaskId": 29,
            "_animationCallbacksBuffer": [],
            "_rendererCache": {},
            "_cdRecurDepth": 0,
            "promise": {
              "__zone_symbol__state": true,
              "__zone_symbol__value": 0
            }
          },
          null,
          {
            "_ngZone": "-pruned-",
            "_pendingCount": 0,
            "_isZoneStable": true,
            "_didWork": true,
            "_callbacks": []
          },
          null,
          {
            "doc": "-pruned-",
            "platform": "browser",
            "cookieName": "XSRF-TOKEN",
            "lastCookieString": "",
            "lastToken": null,
            "parseCount": 0
          },
          {
            "tokenService": "-pruned-",
            "headerName": "X-XSRF-TOKEN"
          },
          [
            "-pruned-"
          ],
          {},
          "-pruned-",
          {
            "xhrFactory": "-pruned-"
          },
          "-pruned-",
          {
            "backend": "-pruned-",
            "injector": "-pruned-",
            "chain": {
              "next": "-pruned-",
              "interceptor": "-pruned-"
            }
          },
          {
            "handler": "-pruned-"
          },
          {
            "scrollStrategies": {
              "_scrollDispatcher": "-pruned-",
              "_viewportRuler": "-pruned-",
              "_ngZone": "-pruned-",
              "_document": "-pruned-"
            },
            "_overlayContainer": {
              "_document": "-pruned-"
            },
            "_componentFactoryResolver": "-pruned-",
            "_positionBuilder": {
              "_viewportRuler": "-pruned-",
              "_document": "-pruned-",
              "_platform": "-pruned-",
              "_overlayContainer": "-pruned-"
            },
            "_keyboardDispatcher": {
              "_attachedOverlays": "-pruned-",
              "_document": "-pruned-"
            },
            "_injector": "-pruned-",
            "_ngZone": "-pruned-",
            "_document": "-pruned-",
            "_directionality": {
              "value": "ltr",
              "change": "-pruned-"
            },
            "_location": "-pruned-"
          },
          null,
          {},
          null,
          null,
          null,
          null,
          null,
          {
            "_overlay": "-pruned-",
            "_injector": "-pruned-",
            "_location": "-pruned-",
            "_defaultOptions": null,
            "_parentDialog": null,
            "_overlayContainer": "-pruned-",
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
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {},
          null,
          null,
          null
        ]
      },
      "console": {},
      "currentUrlTree": "-pruned-",
      "rawUrlTree": "-pruned-",
      "browserUrlTree": "-pruned-",
      "configLoader": {
        "loader": {
          "_compiler": {
            "_metadataResolver": {
              "_config": "-pruned-",
              "_htmlParser": "-pruned-",
              "_ngModuleResolver": "-pruned-",
              "_directiveResolver": "-pruned-",
              "_pipeResolver": "-pruned-",
              "_summaryResolver": "-pruned-",
              "_schemaRegistry": "-pruned-",
              "_directiveNormalizer": "-pruned-",
              "_console": "-pruned-",
              "_staticSymbolCache": null,
              "_reflector": "-pruned-",
              "_errorCollector": null,
              "_nonNormalizedDirectiveCache": "-pruned-",
              "_directiveCache": "-pruned-",
              "_summaryCache": "-pruned-",
              "_pipeCache": "-pruned-",
              "_ngModuleCache": "-pruned-",
              "_ngModuleOfTypes": "-pruned-",
              "_shallowModuleCache": "-pruned-"
            },
            "_delegate": {
              "_metadataResolver": "-pruned-",
              "_templateParser": "-pruned-",
              "_styleCompiler": "-pruned-",
              "_viewCompiler": "-pruned-",
              "_ngModuleCompiler": "-pruned-",
              "_summaryResolver": "-pruned-",
              "_reflector": "-pruned-",
              "_compilerConfig": "-pruned-",
              "_console": "-pruned-",
              "_compiledTemplateCache": "-pruned-",
              "_compiledHostTemplateCache": "-pruned-",
              "_compiledDirectiveWrapperCache": "-pruned-",
              "_compiledNgModuleCache": "-pruned-",
              "_sharedStylesheetCount": 0,
              "_addedAotSummaries": "-pruned-"
            },
            "injector": {
              "parent": "-pruned-",
              "source": null,
              "_records": "-pruned-"
            }
          },
          "_config": {
            "factoryPathPrefix": "",
            "factoryPathSuffix": ".ngfactory"
          }
        },
        "compiler": "-pruned-"
      },
      "routerState": {
        "_root": {
          "value": {
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
              "component": null,
              "routeConfig": null,
              "_urlSegment": "-pruned-",
              "_lastPathIndex": -1,
              "_resolve": "-pruned-",
              "_routerState": "-pruned-"
            },
            "snapshot": "-pruned-",
            "_routerState": "-pruned-"
          },
          "children": [
            {
              "value": "-pruned-",
              "children": "-pruned-"
            }
          ]
        },
        "snapshot": {
          "_root": {
            "value": "-pruned-",
            "children": [
              "-pruned-"
            ]
          },
          "url": "/core/viewbots"
        }
      },
      "transitions": {
        "_isScalar": false,
        "observers": [
          {
            "closed": false,
            "_parent": {
              "closed": false,
              "_parent": "-pruned-",
              "_parents": null,
              "_subscriptions": "-pruned-",
              "syncErrorValue": null,
              "syncErrorThrown": false,
              "syncErrorThrowable": true,
              "isStopped": false,
              "destination": "-pruned-",
              "count": 1,
              "thisArg": "-pruned-"
            },
            "_parents": null,
            "_subscriptions": [
              "-pruned-"
            ],
            "syncErrorValue": null,
            "syncErrorThrown": false,
            "syncErrorThrowable": true,
            "isStopped": false,
            "destination": "-pruned-",
            "count": 2
          }
        ],
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null,
        "_value": {
          "id": 1,
          "currentUrlTree": "-pruned-",
          "currentRawUrl": "-pruned-",
          "extractedUrl": "-pruned-",
          "urlAfterRedirects": "-pruned-",
          "rawUrl": "-pruned-",
          "extras": "-pruned-",
          "promise": {
            "__zone_symbol__state": true,
            "__zone_symbol__value": true
          },
          "source": "imperative",
          "restoredState": null,
          "currentSnapshot": {
            "_root": {
              "value": "-pruned-",
              "children": "-pruned-"
            },
            "url": ""
          },
          "targetSnapshot": null,
          "currentRouterState": {
            "_root": {
              "value": "-pruned-",
              "children": "-pruned-"
            },
            "snapshot": "-pruned-"
          },
          "targetRouterState": null,
          "guards": {
            "canActivateChecks": [],
            "canDeactivateChecks": []
          },
          "guardsResult": null
        }
      },
      "navigations": {
        "_isScalar": false,
        "observers": [],
        "closed": false,
        "isStopped": false,
        "hasError": false,
        "thrownError": null,
        "destination": {
          "_isScalar": false,
          "observers": [],
          "closed": false,
          "isStopped": false,
          "hasError": false,
          "thrownError": null,
          "destination": {
            "_isScalar": false,
            "observers": [],
            "closed": false,
            "isStopped": false,
            "hasError": false,
            "thrownError": null,
            "destination": {
              "_isScalar": false,
              "observers": "-pruned-",
              "closed": false,
              "isStopped": false,
              "hasError": false,
              "thrownError": null,
              "destination": "-pruned-",
              "source": "-pruned-",
              "operator": "-pruned-"
            },
            "source": "-pruned-",
            "operator": {}
          },
          "source": "-pruned-",
          "operator": {}
        },
        "source": "-pruned-",
        "operator": {}
      },
      "locationSubscription": "-pruned-"
    },
    "serverService": {
      "httpClient": "-pruned-",
      "utilityService": {
        "router": "-pruned-",
        "snackBar": {
          "_overlay": "-pruned-",
          "_live": {
            "_ngZone": "-pruned-",
            "_document": "-pruned-",
            "_liveElement": {}
          },
          "_injector": "-pruned-",
          "_breakpointObserver": {
            "mediaMatcher": {
              "platform": "-pruned-"
            },
            "zone": "-pruned-",
            "_queries": {},
            "_destroySubject": {
              "_isScalar": false,
              "observers": "-pruned-",
              "closed": false,
              "isStopped": false,
              "hasError": false,
              "thrownError": null
            }
          },
          "_parentSnackBar": null,
          "_defaultConfig": {
            "politeness": "assertive",
            "announcementMessage": "",
            "duration": 0,
            "data": null,
            "horizontalPosition": "center",
            "verticalPosition": "bottom"
          },
          "_snackBarRefAtThisLevel": null
        },
        "activatedRoute": "-pruned-",
        "formBuilder": "-pruned-",
        "storeVariableService": {
          "store": {
            "_ngZone": "-pruned-",
            "_stateStream": {
              "_isScalar": false,
              "observers": "-pruned-",
              "closed": false,
              "isStopped": false,
              "hasError": false,
              "thrownError": null,
              "_value": "-pruned-"
            },
            "_internalStateOperations": {
              "_stateStream": "-pruned-",
              "_dispatcher": "-pruned-",
              "_config": "-pruned-"
            }
          },
          "storeState": {
            "version": {
              "versions": "-pruned-",
              "versions_pristine": "-pruned-",
              "diff": "-pruned-",
              "selectedVersion": null,
              "botId": 0,
              "errorMap": "-pruned-"
            },
            "reportItem": {
              "formData": null,
              "currentEditedReport": null
            },
            "analysisstate2": {
              "analysisHeaderData": null,
              "overviewInfo": null,
              "channelWiseFlowsPerSession": null,
              "userAcquisition": null,
              "totalMessages": null,
              "averageRoomTime": null,
              "totalFlows": null,
              "userLoyalty": null,
              "channelWiseAverageSessionTime": null,
              "topgenerationtemplates": null,
              "totalSessions": null,
              "flowsPerRoom": null,
              "totalRooms": null,
              "roomDuration": null,
              "channelWiseSessions": null,
              "channelWiseUsers": null,
              "usagetracking": null,
              "sessionsperuser": null,
              "messagespersession": null,
              "timepersession": null,
              "totalTimeOfRooms": null,
              "sessionhandling": null
            },
            "botcreationstate": {
              "codeBased": "-pruned-",
              "pipeLineBased": "-pruned-"
            },
            "chatsessionstate": {
              "frameEnabled": "CHAT_BOX",
              "opened": false,
              "currentRoomId": 168094,
              "currentBotDetails": "-pruned-",
              "currentUId": null,
              "rooms": "-pruned-",
              "consumerDetails": null
            },
            "botlist": {
              "codeBasedBotList": null,
              "pipelineBasedBotList": null,
              "allBotList": "-pruned-"
            },
            "loggeduserenterpriseinfo": {
              "id": 4,
              "enterpriseUniqueName": "",
              "created_at": 1491955200000,
              "email": "",
              "enterprise_unique_name": "ayeshreddy.k",
              "industry": "",
              "logo": "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
              "name": "Ayesh1",
              "phone": "",
              "tier": "",
              "updated_at": 1553644800000,
              "updated_by": 4,
              "websiteUrl": "",
              "enterpriseusers": "-pruned-",
              "tier_group": 4,
              "log_retention_period": "P40D",
              "secret_key": "AQICAHjsZ6dXNX8Jn2vL7XjQU0Ng3LQHWgd3ctQoo1cb1QRYNQEt4co8NkWxF0bschhkg/wGAAAAaTBnBgkqhkiG9w0BBwagWjBYAgEAMFMGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMZv3dyfH8zuFLms/bAgEQgCZYqrgofgbBXqXqRRO0OOQZF28aGUBIq6LbnyFU/hJAUTF5nRWcxg==",
              "created_by": 0,
              "resource_uri": "/api/v1/enterprise/4/",
              "service_key": "-pruned-"
            },
            "app": {
              "lastUpdated": 0,
              "progressbar": "-pruned-",
              "masterIntegrationList": "-pruned-",
              "masterProfilePermissions": "-pruned-",
              "backendUrlRoot": "https://dev.imibot.ai/",
              "showBackendUrlRootButton": false,
              "enterpriseNerData": "-pruned-",
              "masterPipelineItems": null,
              "autoLogoutTime": 1555647222490,
              "pipelineModulesV2List": "-pruned-",
              "roleInfoArr": "-pruned-"
            },
            "loggeduser": {
              "user": "-pruned-"
            }
          }
        },
        "refreshCodeEditor$": {
          "_isScalar": false,
          "observers": [],
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
      "store": "-pruned-",
      "router": "-pruned-",
      "permissionService": {
        "allBackEndActionsToFrontEndTabMapping2": {
          "Get Bots": true,
          "Create Bots": true,
          "Update Bots": true,
          "Delete Bots": true,
          "Get Bots Anonymous": true,
          "Get Enterprise Knowledge base": true,
          "Create Enterprise Knowledge base": true,
          "Update Enterprise Knowledge base": true,
          "Delete Enterprise Knowledge base": true,
          "Create Bot Versioning": true,
          "GET Bot Versioning": true,
          "Update Bot Versioning": true,
          "Delete Bot Versioning": true,
          "Create Role": true,
          "Get Role": true,
          "Update Role": true,
          "Delete Role": true,
          "Create User": true,
          "Get User": true,
          "Update User": true,
          "Get Consumers": true,
          "Get Sessions": true,
          "Analytics": true,
          "Get Bot Testcases": true,
          "Create Bot Testcases": true,
          "Update Bot Testcases": true,
          "Delete Bot Testcases": true,
          "Get Integrations": true,
          "Get Pipeline Module": true,
          "Create Reports": true,
          "Get Reports": true,
          "Update Reports": true,
          "Delete Reports": true,
          "Get Report History": true,
          "Get Enterprise": true,
          "Update Enterprise": true,
          "Delete User": true,
          "Get Report Types": true,
          "Send API": true,
          "Get Messages": true,
          "Get Actions": true,
          "Close Room": true,
          "agent_close": true,
          "Anonymize Conversation": true,
          "Post dfRules Debug": true,
          "Post genRules Debug": true,
          "Post genTemplate Debug": true,
          "Post Workflow Debug": true,
          "Workflow Webhook": true,
          "Facebook Webhook": true,
          "Backward Compatible Message API": true,
          "Intelligence API Webhook": true,
          "Delete Consumer": true,
          "Create Decrypt Audit": true,
          "erase consumer": true,
          "Exec Reports": true,
          "Download Reports": true,
          "Skype API": true,
          "Update Password": true,
          "Get Bot Knowledge base": true,
          "Create Bot Knowledge base": true,
          "Update Bot Knowledge base": true,
          "Delete Bot Knowledge base": true,
          "undefined": true
        },
        "forbiddenActionsToFrontEndMapping": [],
        "allowedApiHttpVerbPPathToActionNamesMapping": {},
        "ApiAccessAllowedUrlList": [
          "/api/v1/actions/",
          "/api/v1/user/login/",
          "/api/v1/user/resetpasswordurl/",
          "/api/v1/user/resetpassword/",
          "/api/v1/webhook/web/",
          "/api/v1/user/enterprise_login/",
          "/api/v1/user/enterprises/",
          "/api/v1/enterprise/",
          "/api/v1/room/",
          "/api/v1/role/",
          "/static/config.json",
          "/static/deploy.json",
          "/deploy.json"
        ],
        "__loggeduser$__selector": {
          "_isScalar": false
        },
        "__app$__selector": {
          "_isScalar": false
        },
        "loggedUser": {
          "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImlkIjo3MDgyLCJ1c2VyX2lkIjo0LCJlbnRlcnByaXNlX2lkIjo0LCJyb2xlX2lkIjoyfQ.yDN-99m2bEQ17Z9PSIrQI1FVm5SbS1Akk8yNAt5T3qg",
          "created_at": 1510771284000,
          "email": "ayeshreddy.k@imimobile.com",
          "enterprise": {
            "enterprise_unique_name": "ayeshreddy.k",
            "id": 4,
            "logo": "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
            "name": "Ayesh1"
          },
          "enterprise_id": 4,
          "first_name": "Ayesh",
          "id": 4,
          "is_active": true,
          "is_admin": true,
          "is_superuser": false,
          "last_login": 1555643198000,
          "last_name": "Update",
          "old_id": "5a0c3cfcb05070685ed1cdbb",
          "resource_uri": "/api/v1/user/4/",
          "role": {
            "id": 2,
            "name": "Admin",
            "permissions": {
              "actions": "-pruned-"
            }
          },
          "role_id": 2,
          "updated_at": 1555580485000,
          "user_access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImlkIjo0fQ.Q4zn6_iHYH4zc4WL0WUeRAFPCXqwdEzAmxv7KwO35J0"
        }
      },
      "constantsService": {
        "NEW_BOT_VERSION_TEMPLATE": {
          "bot_id": 0,
          "comment": "",
          "df_rules": "",
          "df_template": "",
          "generation_rules": "",
          "generation_templates": "",
          "id": -1,
          "workflow": "",
          "updated_fields": {
            "df_template": false,
            "df_rules": false,
            "generation_rules": false,
            "generation_template": false,
            "workflows": false
          },
          "forked_from": -1
        },
        "BACKEND_URL": "https://staging.imibot.ai/",
        "BACKEND_URL_LOGIN": "https://staging.imibot.ai/api/v1/user/login/",
        "BACKEND_URL_ENTERPRISE_USERS": "https://staging.imibot.ai/users/enterprise/",
        "BACKEND_USER_UPDATE_URL": "https://staging.imibot.ai/user/",
        "BACKEND_USER_CODE_BASED_BOT_LIST": "https://staging.imibot.ai/integrations",
        "BACKEND_USER_PIPELINE_BASED_BOT_LIST": "https://staging.imibot.ai/api/v1/bot/",
        "CHANNEL_LIST": [
          {
            "name": "all",
            "displayName": "All Channels"
          },
          {
            "name": "facebook",
            "displayName": "Facebook"
          },
          {
            "name": "web",
            "displayName": "WebChat"
          },
          {
            "name": "alexa",
            "displayName": "Alexa"
          }
        ],
        "TIME_GRANULARITY_LIST": [
          {
            "name": "hour",
            "displayName": "Hour"
          },
          {
            "name": "day",
            "displayName": "Day"
          },
          {
            "name": "week",
            "displayName": "Week"
          },
          {
            "name": "month",
            "displayName": "Month"
          },
          {
            "name": "year",
            "displayName": "Year"
          }
        ],
        "DATE_PICKER_CONFIG": {
          "containerClass": "theme-dark-blue",
          "dateInputFormat": "DD/MM/YYYY"
        },
        "LOCALSTORAGE_APP_STATE": "LOCALSTORAGE_APP_STATE",
        "LOCALSTORAGE_LAST_STATE_UPDATED": "LOCALSTORAGE_LAST_STATE_UPDATED",
        "HANDSON_TABLE_BOT_TESTING_colHeaders": [
          "Message",
          "Expected Template",
          "Status",
          "Generated Template",
          "RoomId",
          "TransactionId"
        ],
        "HANDSON_TABLE_BOT_TESTING_columns": [
          {
            "data": 0,
            "type": "text"
          },
          {
            "data": 1,
            "type": "text"
          },
          {
            "data": 2,
            "type": "text",
            "readOnly": true
          },
          {
            "data": 3,
            "type": "text",
            "readOnly": true
          },
          {
            "data": 4,
            "type": "text",
            "readOnly": true
          },
          {
            "data": 5,
            "type": "text",
            "readOnly": true
          }
        ],
        "HANDSON_TABLE_KNOWLEDGE_BASE_SETTING": {},
        "HANDSON_TABLE_KNOWLEDGE_BASE_colHeaders": [
          "",
          "",
          ""
        ],
        "HANDSON_TABLE_KNOWLEDGE_BASE_columns": [],
        "SMART_TABLE_REPORT_TABLE_DATA_META_DICT_TEMPLATE": {
          "isactive": {
            "originalKey": "isactive",
            "value": "",
            "type": "string",
            "displayValue": "Active",
            "search": true,
            "searchValue": true
          },
          "bot": {
            "originalKey": "bot",
            "value": "",
            "type": "string",
            "displayValue": "Bot",
            "search": true,
            "searchValue": true
          },
          "name": {
            "originalKey": "name",
            "value": "",
            "type": "string",
            "displayValue": "Report Type",
            "search": true,
            "searchValue": true
          },
          "frequency": {
            "originalKey": "frequency",
            "value": "",
            "type": "string",
            "displayValue": "Frequency",
            "search": true,
            "searchValue": true
          },
          "lastreportgenerated": {
            "originalKey": "lastreportgenerated",
            "value": "",
            "type": "time",
            "displayValue": "Last report generated",
            "search": false,
            "searchValue": "",
            "dateRange": true
          },
          "nextreportgenerated": {
            "originalKey": "nextreportgenerated",
            "value": "",
            "type": "time",
            "displayValue": "Next scheduled date",
            "search": false,
            "searchValue": "",
            "dateRange": true
          }
        },
        "SMART_TABLE_REPORT_HISTORY_TABLE_DATA_META_DICT_TEMPLATE": {
          "bot": {
            "originalKey": "bot",
            "value": "",
            "type": "string",
            "displayValue": "Bot",
            "search": true,
            "searchValue": true
          },
          "name": {
            "originalKey": "name",
            "value": "",
            "type": "string",
            "displayValue": "Report Type",
            "search": true,
            "searchValue": true
          },
          "created_at": {
            "originalKey": "created_at",
            "value": "",
            "type": "time",
            "displayValue": "Generated Date",
            "search": false,
            "searchValue": "",
            "dateRange": true
          },
          "actions": {
            "originalKey": "",
            "type": "icon",
            "displayValue": "Actions",
            "custom": true,
            "name": "",
            "search": false,
            "searchValue": true
          }
        },
        "HIGHCHART_THEMEVALUE_ANALYTICS_PERFORMANCE_SESSION_WISE": {
          "chart": {
            "style": {
              "fontFamily": "helvetica"
            }
          },
          "colors": [
            "#5392ff",
            "#71cddd",
            "#34bc6e",
            "#95d13c",
            "#ffb000",
            "#fe8500",
            "#ff509e",
            "#9b82f3"
          ]
        },
        "HIGHCHART_THEMEVALUE_ANALYTICS_PERFORMANCE_TEMPLATE_KEY_AND_FLOW_TRIGGERED": {
          "chart": {
            "style": {
              "fontFamily": "helvetica"
            }
          },
          "colors": [
            "#5392ff",
            "#71cddd",
            "#34bc6e",
            "#95d13c",
            "#ffb000",
            "#fe8500",
            "#ff509e",
            "#9b82f3"
          ]
        },
        "SMART_TABLE_ENTERPRISE_NER_TABLE_DATA_META_DICT_TEMPLATE": {
          "key": {
            "originalKey": "key",
            "value": "",
            "type": "string",
            "displayValue": "Concept name",
            "search": true,
            "searchValue": true
          },
          "ner_type": {
            "originalKey": "ner_type",
            "value": "",
            "type": "string",
            "displayValue": "Concept type",
            "search": true,
            "searchValue": true
          },
          "updated_at": {
            "originalKey": "updated_at",
            "value": "",
            "type": "time",
            "displayValue": "Last Update",
            "search": false,
            "searchValue": true,
            "dateRange": true
          }
        },
        "SMART_TABLE_BOT_KNOWLEDGE_BASE_NER_TABLE_DATA_META_DICT_TEMPLATE": {
          "key": {
            "originalKey": "key",
            "value": "",
            "type": "string",
            "displayValue": "Concept name",
            "search": true,
            "searchValue": true
          },
          "ner_type": {
            "originalKey": "ner_type",
            "value": "",
            "type": "string",
            "displayValue": "Concept type",
            "search": true,
            "searchValue": true
          },
          "conflict_policy": {
            "originalKey": "conflict_policy",
            "value": "",
            "type": "string",
            "displayValue": "Override policy",
            "search": true,
            "searchValue": true
          },
          "updated_at": {
            "originalKey": "updated_at",
            "value": "",
            "type": "time",
            "displayValue": "Last Update",
            "search": false,
            "searchValue": true,
            "dateRange": true
          }
        },
        "SMART_TABLE_SESSION_TABLE_DATA_META_DICT_TEMPLATE": {
          "channels": {
            "originalKey": "",
            "value": "",
            "type": "image",
            "displayValue": "Channels",
            "search": false,
            "searchValue": true
          },
          "id": {
            "originalKey": "id",
            "value": "",
            "type": "number",
            "displayValue": "ID",
            "search": false,
            "searchValue": true
          },
          "consumer_id": {
            "originalKey": "consumer_id",
            "value": "",
            "type": "number",
            "displayValue": "Consumer ID",
            "search": false,
            "searchValue": true
          },
          "total_message_count": {
            "originalKey": "",
            "value": "",
            "type": "number",
            "displayValue": "Messages",
            "search": false,
            "searchValue": true
          },
          "updated_at": {
            "originalKey": "",
            "value": "",
            "type": "time",
            "displayValue": "Updated At",
            "search": false,
            "searchValue": true,
            "dateRange": false
          },
          "room_metadata": {
            "originalKey": "",
            "type": "mat-icon",
            "displayValue": "Metadata",
            "custom": true,
            "name": "",
            "search": false,
            "searchValue": true
          }
        },
        "SMART_TABLE_ENTERPISE_USERS_SETTING": {
          "columns": {
            "first_name": {
              "title": "First Name"
            },
            "email": {
              "title": "Email"
            },
            "role": {
              "title": "Role"
            },
            "permissions": {
              "title": "Permissions"
            },
            "created_at": {
              "title": "Created At"
            },
            "updated_at": {
              "title": "Updated At"
            }
          },
          "actions": {
            "add": false,
            "edit": false,
            "delete": false
          },
          "pager": {
            "display": false,
            "perPage": 5
          }
        },
        "SMART_TABLE_SERVICE_KEY_EXPIRED": {
          "key": {
            "originalKey": "key",
            "value": "",
            "type": "string",
            "displayValue": "Token Id"
          },
          "description": {
            "originalKey": "description",
            "value": "",
            "type": "string",
            "displayValue": "Description"
          },
          "created_at": {
            "originalKey": "created_at",
            "value": "",
            "type": "string",
            "displayValue": "Created on"
          },
          "expired_at": {
            "originalKey": "expired_at",
            "value": "",
            "type": "string",
            "displayValue": "Expires on"
          },
          "expired_by": {
            "originalKey": "expired_by",
            "value": "",
            "type": "string",
            "displayValue": "Expired by"
          }
        },
        "SMART_TABLE_SERVICE_KEY_ACTIVE": {
          "key": {
            "originalKey": "key",
            "value": "",
            "type": "string",
            "displayValue": "Token Id"
          },
          "description": {
            "originalKey": "description",
            "value": "",
            "type": "string",
            "displayValue": "Description"
          },
          "created_at": {
            "originalKey": "created_at",
            "value": "",
            "type": "string",
            "displayValue": "Created on"
          },
          "actions": {
            "originalKey": "",
            "type": "icon",
            "displayValue": "Actions",
            "custom": true,
            "name": ""
          }
        },
        "SMART_TABLE_USER_DICT_TEMPLATE": {
          "first_name": {
            "originalKey": "first_name",
            "value": "",
            "type": "number",
            "displayValue": "User Name"
          },
          "email": {
            "originalKey": "email",
            "value": "",
            "type": "number",
            "displayValue": "Email ID"
          },
          "role_id": {
            "originalKey": "role_id",
            "value": "",
            "type": "string",
            "displayValue": "Role"
          },
          "bots": {
            "originalKey": "bots",
            "value": "",
            "type": "string",
            "displayValue": "Bots assigned"
          },
          "actions": {
            "originalKey": "",
            "type": "icon",
            "displayValue": "Actions",
            "custom": true,
            "name": ""
          }
        },
        "SMART_TABLE_CONSUMER_TABLE_DATA_META_DICT_TEMPLATE": {
          "id": {
            "originalKey": "id",
            "value": "",
            "type": "number",
            "displayValue": "ID",
            "search": true,
            "searchValue": true
          },
          "name": {
            "originalKey": "",
            "value": "",
            "type": "number",
            "displayValue": "Name",
            "search": true,
            "searchValue": true
          },
          "phone": {
            "originalKey": "",
            "value": "",
            "type": "number",
            "displayValue": "Phone",
            "search": true,
            "searchValue": true
          },
          "facebook_id": {
            "originalKey": "facebook_id",
            "value": "",
            "type": "number",
            "displayValue": "Facebook ID",
            "search": true,
            "searchValue": true
          },
          "skype_id": {
            "originalKey": "skype_id",
            "value": "",
            "type": "number",
            "displayValue": "Skype ID",
            "search": true,
            "searchValue": true
          },
          "uid": {
            "originalKey": "uid",
            "value": "",
            "type": "number",
            "displayValue": "UID",
            "search": true,
            "searchValue": true
          },
          "email": {
            "originalKey": "email",
            "value": "",
            "type": "string",
            "displayValue": "Email",
            "search": true,
            "searchValue": true
          },
          "updated_at": {
            "originalKey": "updated_at",
            "value": "",
            "type": "time",
            "displayValue": "Updated At",
            "search": false,
            "searchValue": false,
            "dateRange": true
          },
          "actions": {
            "originalKey": "",
            "type": "mat-icon",
            "displayValue": "Actions",
            "custom": true,
            "name": "",
            "search": false,
            "searchValue": false
          }
        },
        "__app$__selector": {
          "_isScalar": false
        },
        "__loggeduser$__selector": {
          "_isScalar": false
        },
        "appState": "-pruned-",
        "loggedUser": "-pruned-",
        "allowedPermissionIdsToCurrentRole": []
      },
      "X_AXIS_TOKEN": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImlkIjo0fQ.Q4zn6_iHYH4zc4WL0WUeRAFPCXqwdEzAmxv7KwO35J0",
      "AUTH_TOKEN": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImlkIjo3MDgyLCJ1c2VyX2lkIjo0LCJlbnRlcnByaXNlX2lkIjo0LCJyb2xlX2lkIjoyfQ.yDN-99m2bEQ17Z9PSIrQI1FVm5SbS1Akk8yNAt5T3qg",
      "isLoggedIn": false,
      "__loggeduser$__selector": {
        "_isScalar": false
      },
      "__app$__selector": {
        "_isScalar": false
      },
      "roleName": "Admin",
      "roleInfo": {
        "base_role": 0,
        "created_at": 1536651184000,
        "created_by": "unknown",
        "enterprise_id": 0,
        "id": 2,
        "is_system_role": true,
        "name": "Admin",
        "permissions": {
          "actions": []
        },
        "resource_uri": "/api/v1/role/2/",
        "session_expiry_time": 3600,
        "updated_at": 1536651184000,
        "updated_by": "unknown"
      },
      "currentRoomId": 168094,
      "currentPreviewBot": {
        "active_version": {
          "bot_id": 505,
          "comment": "Default Active Version",
          "id": 743,
          "is_ui_view": true,
          "version": 1
        },
        "active_version_id": 743,
        "advanced_data_protection": false,
        "allow_agent_handover": false,
        "allow_anonymization": false,
        "allow_feedback": false,
        "avatars": [
          {
            "id": 1,
            "imageUrl": "https://cp-mlxprod-static.microsoft.com/013920-1003/en-us/thumbnail.png",
            "name": "test"
          }
        ],
        "blanket_consent": false,
        "bot_access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTA1LCJyb2xlIjoiYm90In0.QLQuGqB4waqS8LOOFsi2RLlRSfiCgVtFCi5hfcW5IsE",
        "bot_metadata": {},
        "bot_type": "chatbot",
        "bot_unique_name": "QA testing bot 1555580484950",
        "child_bots": [],
        "consent_categories": [
          "data_retention",
          "data_anonymization"
        ],
        "consent_message": "",
        "created_at": 1555580485000,
        "created_by": "Ayesh Update",
        "data_persistence_period": 30,
        "description": "Play Game and win Coupons",
        "enterprise_id": 4,
        "error_message": "",
        "first_message": "Hi.. Welcome to test world. I am testing bot.",
        "heading": "Welcome to the Game World",
        "id": 505,
        "integrations": {
          "ccsp_details": {
            "debug": {
              "debugurl": "",
              "enabled": false
            },
            "imichat": {
              "access-token": "",
              "domain": "",
              "enabled": false,
              "service-key": ""
            }
          },
          "channels": {
            "alexa": {
              "enabled": false,
              "skillId": ""
            },
            "facebook": {
              "enabled": true,
              "facebook-token": "EAAc8APVKjxsBAI86VkZBDg5ZCZAGXSMpVsNQRdUgTSR1eq31ajiajCLSsTQLAeEzgqs6uKN2qq0VBAXcDX31D2OPzEJvaQZAzkNNLcexNxuresG7zXabZCIfySUnEUf9XVbDPWBRZAwJZBFdtAnmXusEYtHlIZAHiPzRWB8jdsFlswZDZD",
              "id": "194700987927464"
            },
            "imiconnect": {
              "appId": "",
              "appSecret": "",
              "enabled": false,
              "serviceKey": "",
              "streamName": ""
            },
            "skype": {
              "client_id": "",
              "client_secret": "",
              "enabled": false
            }
          }
        },
        "is_manager": false,
        "latest_version": {
          "_id": 505,
          "bot_id": 505,
          "comment": "Default Active Version",
          "id": 743,
          "version": 1
        },
        "logo": "https://cp-mlxprod-static.microsoft.com/013920-1003/en-us/thumbnail.png",
        "name": "QA Testing bot_1555580484950",
        "old_id": "",
        "parent_bots": [],
        "pipelines": [
          {
            "contextual": false,
            "default": true,
            "id": "Azure Spell Check",
            "inputParams": {},
            "library": "azure",
            "module": "spell_check",
            "type": "item"
          },
          {
            "contextual": false,
            "default": false,
            "id": "Google Parse Tree",
            "inputParams": {},
            "library": "google",
            "module": "parsetree",
            "type": "item"
          },
          {
            "contextual": false,
            "default": false,
            "id": "IMIbot Numbers Recognition",
            "inputParams": {},
            "library": "botman",
            "module": "numbers",
            "type": "item"
          },
          {
            "contextual": false,
            "default": true,
            "id": "IMIbot Common Sense",
            "inputParams": {},
            "library": "botman",
            "module": "commonsense",
            "type": "item"
          },
          {
            "contextual": false,
            "default": true,
            "id": "IMIbot Custom NER",
            "inputParams": {},
            "library": "botman",
            "module": "custom_ners",
            "type": "item"
          }
        ],
        "resource_uri": "/api/v1/bot/505/",
        "room_close_callback": false,
        "room_persistence_time": 240,
        "transactions_per_pricing_unit": 0,
        "updated_at": 1555580485000,
        "updated_by": "Ayesh Update",
        "enterprise_unique_name": "ayeshreddy.k"
      }
    },
    "store": "-pruned-",
    "constantsService": "-pruned-",
    "isBotDetail": false,
    "isBuildBot": false
  }

}