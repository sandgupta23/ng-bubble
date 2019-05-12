import { Injectable } from '@angular/core';
import {IStore} from './interface';
import {LoggingService} from './editor-wrapper/logging.service';
import {ELocalStorageKey} from '../../enum';

/**
 * storeKeys:
 * keys from EditorWrapperComponent, to be stored in localstorage
 * */
export const storeKeys = [
  'minimize',
  // '_componentfiles',
  // '_componentstr',
  'showSearchPanel',
  'top',
  'left',
  'right',
  'bottom',
  'height',
  'width',
  // 'componentObj',
  'keyOptions',
  'myObject',
  // 'codeData',
  'headerFormData',
  'activeHeaderTab',
  'expand',
  "shouldFoldCode",
  'path',
  'editorMode'
];

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  static init() {
    let storeStr = localStorage.getItem(ELocalStorageKey.NG_BUBBLE_STATE);
    StoreService.patchStore(JSON.parse(storeStr));
  }

  public static config;
  private static store: IStore = {};

  static patchStore(state:IStore = {}){
    StoreService.store = {...StoreService.store, ...state};
    delete StoreService.store.selectedElXpath;/*todo*/
    try{
      this.setInLocalStorage(StoreService.store);
    }catch (e) {
      LoggingService.log(e);
    }
  }

  static setInLocalStorage(state:IStore){

    let oldState = JSON.parse(localStorage.getItem(ELocalStorageKey.NG_BUBBLE_STATE))||{};
    localStorage.setItem(ELocalStorageKey.NG_BUBBLE_STATE, JSON.stringify({...oldState, ...state}));
  }

  static getStoreValue(){
    return StoreService.store;
  }
}
