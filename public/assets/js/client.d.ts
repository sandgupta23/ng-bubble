interface IWSData {
    type: EWSTypes;
    error?: number;
    errorMessage?: string;
    payload?: ILineFinderData;
}
declare enum EWSTypes {
    SEARCH = "SEARCH",
    open = "open",
    openByPath = "openByPath",
    getFileByPath = "getFileByPath",
    setFileByPath = "setFileByPath",
    reIndex = "reIndex",
    ack = "ack"
}
interface ILineFinderData {
    id?: string;
    tagName?: string;
    targetTagName?: string;
    classList?: string[];
    innerText?: string;
    file?: string;
    pathToOpen?: string;
    editor?: string;
    action?: string;
}
declare let ng: any;
declare let CodeMirror: any;
declare var NG_BUBBLE_IMPORTED: boolean;
