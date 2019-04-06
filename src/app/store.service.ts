import { Injectable } from '@angular/core';
import {IStore} from './interface';

/**
 * storeKeys
 * keys from EditorWrapperComponent, to store in localstorage
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
    let storeStr = localStorage.getItem('NG_BUBBLE_STATE');
    StoreService.patchStore(JSON.parse(storeStr));
  }

  private static store: IStore = {};

  static patchStore(state:IStore = {}){
    StoreService.store = {...StoreService.store, ...state};
    delete StoreService.store.selectedElXpath;/*todo*/
    try{
      this.setInLocalStorage(StoreService.store);
    }catch (e) {
      console.log("error trying to save=>", state);
    }
  }

  static setInLocalStorage(state:IStore){

    let oldState = JSON.parse(localStorage.getItem("NG_BUBBLE_STATE"))||{};
    localStorage.setItem('NG_BUBBLE_STATE', JSON.stringify({...oldState, ...state}));
  }

  static getStoreValue(){
    return StoreService.store;
  }
}
