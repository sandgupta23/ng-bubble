import {IFileData} from './editor-wrapper/file-search-panel/file-search-panel.component';

enum EEditorDisplayState {
  fileContent,
  ComponentContent,
}

export interface IStore {
  componentFiles?: IFileData[];
  componentKeys?: string[];
  HeaderFormValue?: object;
  minimize?: boolean;
  expand?: boolean;
  editorDisplayState?: EEditorDisplayState,
  codeText?: string
}

export interface ILocalConfig {
  'preferredIde': string;//'WEBSTORM' || "VSCODE";
  'inputTaken': boolean;
  'guess': boolean;
  'componentSelector': string;
  'ctrl': boolean;
}