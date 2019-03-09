import { EWSTypes } from "./enums";
import { ILineFinderData } from "./backend/line-finder";
export interface IFsItem {
    name?: string;
    type?: string;
    path?: string;
    items?: IFsItem[];
    size?: number;
}
export interface IFsItemTree {
    files: IFsItem[];
    folders: IFsItem[];
}
export interface ILocalConfig {
    "vscode"?: number;
    "webstorm"?: number;
    "isAngular"?: boolean;
    "preferredIde"?: string;
    "history"?: [];
    inputTaken?: boolean;
    guess: boolean;
    componentSelector: string;
    ctrl: boolean;
}
export interface IGlobalConfig {
    "currentEditor": "";
    "bubble-position": 4;
    "search-modal-position": 0;
    "ignore-multi-encounter": true;
    "shortcut-bubble": "";
    "shortcut-search-modal": "";
}
export interface IInquirerOutPut {
    ide: string;
    isAngular: string;
    guess: string;
    componentSelector: string;
    ctrl: string;
}
export interface IWSData {
    type: EWSTypes;
    error?: number;
    errorMessage?: string;
    payload?: ILineFinderData;
}
