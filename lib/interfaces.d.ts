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
}
export interface IGlobalConfig {
    "currentEditor": "";
    "bubble-position": 4;
    "search-modal-position": 0;
    "ignore-multi-encounter": true;
    "shortcut-bubble": "";
    "shortcut-search-modal": "";
}
