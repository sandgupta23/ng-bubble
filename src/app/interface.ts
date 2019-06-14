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
  editorDisplayState?: EEditorDisplayState;
  codeText?: string;
  selectedElXpath?: string;
}

export interface ILocalConfig {
  'preferredIde': string; // 'WEBSTORM' || "VSCODE";
  'inputTaken': boolean;
  'guess': boolean;
  'componentSelector': string;
  'angularPrefix': string;
  'ctrl': boolean;
}

export interface IDependency {
  name: string;
  decorators: any[];
}

export interface ICoords {
  top: string;
  left: string;
  componentName: string;
  tagName: string;
  componentTagName: string;
  componentNode?: HTMLElement;
}
