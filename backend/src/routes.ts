import {Request, Response} from 'express';
import {
  exactMatchedFileIndex,
  getFileContent,
  getHtmlOrTsFile,
  logDanger,
  logServerBusyError,
  openInIde,
  root,
  setFileContent,

} from './utility';
import {ILineFinderData, lineToOpen} from './line-finder';
import {getLocalConfig} from './config';
import {sendData} from './ws';
import {EIdeNames, EWSTypes} from '../enums';
import {IFsItem, IWSData} from '../interfaces';
import {SERVER_PORT, WEBSOCKET_PORT} from './constants';

const scan = require('./scan');
const path = require('path');


let folders: any[] = [], files: any = [];
export let SEARCH_CACHE: { [index: string]: any } = {};
let tree: any;

export function websocketInit(server: any) {

  return new Promise((resolve, reject) => {
    function sendAck(ws: any, data: ILineFinderData) {
      sendData(ws, {type: EWSTypes.ack});
    }

    server.on('error', function (error: any) {
      logServerBusyError();
    });
    server.on('connection', (ws: any) => {
      console.log('Client connected');

      resolve(server);
      ws.on('message', (message: string) => {
        const data: IWSData = JSON.parse(message);

        if (data.type === EWSTypes.open) {
          handleOpenRequest(ws, <ILineFinderData>data.payload);
        } else if (data.type === EWSTypes.SEARCH || data.type === EWSTypes.COMPONENT_FILE_SEARCH) {
          handleSearchRequest(ws, <ILineFinderData>data.payload, data.type);
        } else if (data.type === EWSTypes.openByPath) {
          handleOpenByPathRequest(ws, <ILineFinderData>data.payload);
        } else if (data.type === EWSTypes.getFileByPath) {
          handleGetFileByPathRequest(ws, <ILineFinderData>data.payload);
        } else if (data.type === EWSTypes.setFileByPath) {
          handleSetFileByPathRequest(ws, <ILineFinderData>data.payload);
        } else if (data.type === EWSTypes.reIndex) {
          handleReIndexRequest(ws);
        } else if (data.type === EWSTypes.getConfig) {
          handleConfigRequest(ws);
        } else if (data.type === EWSTypes.shutDown) {
          handleShutDOwnRequest(ws);
        }
      });
    });


    let localConfig = getLocalConfig();
    let ide_user_input = localConfig && localConfig.preferredIde;
    reIndex();

    function searchData(data: any, searchTerms: string, exact?: boolean) {
      /*TODO: make it a pure function*/
      for (let d of data) {
        if (d.type === 'folder') {
          searchData(d.items, searchTerms, exact);
          if (exact) {
            if (d.name.toLowerCase().includes(searchTerms.toLowerCase())) {
              folders.push(d);
            }
          } else {
            if (d.name.toLowerCase().match(searchTerms.toLowerCase())) {
              folders.push(d);
            }
          }
        } else if (d.type === 'file') {
          // if (d.name.toLowerCase().match(searchTerms)) {
          // if (d.name.replace(/\W/g, '').toLowerCase().includes(searchTerms.replace(/\W/g, '').toLowerCase())) {
          let target = searchTerms.toLowerCase().replace(/\W/g, '');
          let mainStr = d.name.replace(/\W/g, '').toLowerCase();
          if (mainStr.startsWith(target)) {
            files.push(d);
          }
        }
      }
      return {folders: folders, files: files};
    }


    async function handleShutDOwnRequest(ws: any) {
      sendAck(ws, {ext: ''} as ILineFinderData);
      process.exit();
    }

    async function handleConfigRequest(ws: any) {
      sendData(ws, {payload: localConfig, type: EWSTypes.getConfig});
    }


    async function handleOpenRequest(ws: any, payload: ILineFinderData) {
      files = [];
      folders = [];
      let pathToBeOpened, codeText;
      pathToBeOpened = payload.pathToOpen;
      codeText = payload.codeText;
      let ide_clicked = payload.editor;
      if (!pathToBeOpened && payload.searchTerm) {
        let searchTerm = payload.searchTerm; //.toLowerCase().replace('app-', '');

        let foundItems = SEARCH_CACHE[searchTerm] || searchData(tree.items, searchTerm);
        if (!SEARCH_CACHE[searchTerm]) SEARCH_CACHE[searchTerm] = foundItems;
        if (!(foundItems && foundItems.files && foundItems.files.length > 0)) {
          console.log('Could not file anything for :' + searchTerm);
          sendData(ws, {error: 401, errorMessage: 'ng-bubble: no matching file found', type: EWSTypes.open});
          return;
        }
        let exactMatchIndex = exactMatchedFileIndex(foundItems, searchTerm);

        pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : getHtmlOrTsFile(foundItems.files)/*foundItems.files[0].path*/;

      }

      try {
        let lineToOpenInIde: number = (await lineToOpen(pathToBeOpened, payload)) || 0;
        let currentIde = ide_clicked ? ide_clicked : ide_user_input;
        await openInIde(pathToBeOpened, currentIde, codeText, payload, lineToOpenInIde);
        sendData(ws, {error: 200, type: EWSTypes.ack});
      } catch (e) {
        //console.error(e);
        sendData(ws, {error: 422, type: EWSTypes.ack});
      }
    }

    async function handleOpenByPathRequest(ws: any, payload: ILineFinderData) {
      await openInIde(payload.pathToOpen, payload.editor || ide_user_input, '');
      sendData(ws, {type: EWSTypes.openByPath, error: 200});
    }

    async function handleGetFileByPathRequest(ws: any, payload: ILineFinderData) {
      /*TODO: should have used ajax here*/
      /*TODO: pathToOpen => unfortunate name really*/
      let data: string = await getFileContent(payload.pathToOpen);
      sendData(ws, <any>{type: EWSTypes.getFileByPath, payload: {file: data}});
    }

    async function handleSetFileByPathRequest(ws: any, payload: ILineFinderData) {
      /*TODO: should have used ajax here*/
      let data: string = await setFileContent(payload.pathToOpen, payload.file);
      sendData(ws, <any>{type: EWSTypes.getFileByPath, payload: {file: data}});
    }

    async function handleReIndexRequest(ws: any) {
      // await openInIde(payload.pathToOpen, payload.editor || ide_user_input, "");
      tree = scan(root, '');
      setTimeout(() => {
        sendData(ws, {type: EWSTypes.ack, error: 200});
      }, 2000);
    }

    function handleSearchRequest(ws: any, payload: ILineFinderData, type: EWSTypes) {
      files = [];
      folders = [];
      let file = (payload.file as string).toLowerCase();
      let pathToBeOpened;
      try {
        let foundItems = searchData(tree.items, file, false);
        /*todo: just to avoid ts error*/
        sendData(ws, {
          error: 200,
          type: type,
          payload: {
            files: foundItems.files,
            file: '',
            tagName: '',
            targetTagName: '',
            innerText: '',
            id: '',
            classList: [],
            codeText: '',
            editor: EIdeNames.WEBSTORM,
            exact: false,
            path: '',
            pathToOpen: '',
            searchTerm: '',
            ext: ''

          }
        });
      } catch (e) {
        //console.error(e);
        sendData(ws, {error: 422, type: EWSTypes.SEARCH});
      }
    }
  });
}


export function reIndex() {
  tree = scan(root, '');
}