"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./utility");
const line_finder_1 = require("./line-finder");
const config_1 = require("./config");
const ws_1 = require("./ws");
const enums_1 = require("../enums");
const scan = require('./scan');
const path = require('path');
const root = process.cwd();
// const root = path.join(__dirname, '../../');
// const root = 'D:\\nodebook\\DEVELOP\\bot_platform-fe';
// const root = 'D:\\nodebook\\angular-prefix';
console.log('root===>>', root);
const Server = require('ws').Server;
let folders = [], files = [];
exports.SEARCH_CACHE = {};
function routesInit(app) {
    function sendAck(ws, data) {
        ws_1.sendData(ws, { type: enums_1.EWSTypes.ack });
    }
    const server = new Server({ port: 11640 });
    server.on('connection', (ws) => {
        ws.on('message', (message) => {
            let data = JSON.parse(message);
            //
            if (data.type === enums_1.EWSTypes.open) {
                handleOpenRequest(ws, data.payload);
            }
            else if (data.type === enums_1.EWSTypes.SEARCH || data.type === enums_1.EWSTypes.COMPONENT_FILE_SEARCH) {
                handleSearchRequest(ws, data.payload, data.type);
            }
            else if (data.type === enums_1.EWSTypes.openByPath) {
                handleOpenByPathRequest(ws, data.payload);
            }
            else if (data.type === enums_1.EWSTypes.getFileByPath) {
                handleGetFileByPathRequest(ws, data.payload);
            }
            else if (data.type === enums_1.EWSTypes.setFileByPath) {
                handleSetFileByPathRequest(ws, data.payload);
            }
            else if (data.type === enums_1.EWSTypes.reIndex) {
                handleReIndexRequest(ws);
            }
            else if (data.type === enums_1.EWSTypes.getConfig) {
                handleConfigRequest(ws);
            }
        });
    });
    let localConfig = config_1.getLocalConfig();
    let ide_user_input = localConfig && localConfig.preferredIde;
    let tree = scan(root, '');
    app.get('/scan', function (req, res) {
        res.send(tree);
    });
    function rightClickHandler(data) {
    }
    function searchData(data, searchTerms, exact) {
        /*TODO: make it a pure function*/
        for (let d of data) {
            if (d.type === 'folder') {
                searchData(d.items, searchTerms, exact);
                if (exact) {
                    if (d.name.toLowerCase().includes(searchTerms.toLowerCase())) {
                        folders.push(d);
                    }
                }
                else {
                    if (d.name.toLowerCase().match(searchTerms.toLowerCase())) {
                        folders.push(d);
                    }
                }
            }
            else if (d.type === 'file') {
                // if (d.name.toLowerCase().match(searchTerms)) {
                // if (d.name.replace(/\W/g, '').toLowerCase().includes(searchTerms.replace(/\W/g, '').toLowerCase())) {
                let target = searchTerms.toLowerCase().replace(/\W/g, '');
                let mainStr = d.name.replace(/\W/g, '').toLowerCase();
                if (mainStr.startsWith(target)) {
                    files.push(d);
                }
            }
        }
        return { folders: folders, files: files };
    }
    function handleConfigRequest(ws) {
        return __awaiter(this, void 0, void 0, function* () {
            ws_1.sendData(ws, { payload: localConfig, type: enums_1.EWSTypes.getConfig });
        });
    }
    function handleOpenRequest(ws, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            files = [];
            folders = [];
            let pathToBeOpened, codeText;
            pathToBeOpened = payload.pathToOpen;
            codeText = payload.codeText;
            let ide_clicked = payload.editor;
            if (!pathToBeOpened && payload.searchTerm) {
                let searchTerm = payload.searchTerm; //.toLowerCase().replace('app-', '');
                let foundItems = exports.SEARCH_CACHE[searchTerm] || searchData(tree.items, searchTerm);
                if (!exports.SEARCH_CACHE[searchTerm])
                    exports.SEARCH_CACHE[searchTerm] = foundItems;
                if (!(foundItems && foundItems.files && foundItems.files.length > 0)) {
                    ws_1.sendData(ws, { error: 401, errorMessage: 'ng-bubble: no matching file found', type: enums_1.EWSTypes.open });
                    return;
                }
                let exactMatchIndex = utility_1.exactMatchedFileIndex(foundItems, searchTerm);
                pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : foundItems.files[0].path;
            }
            try {
                let lineToOpenInIde = (yield line_finder_1.lineToOpen(pathToBeOpened, payload)) || 0;
                let currentIde = ide_clicked ? ide_clicked : ide_user_input;
                yield utility_1.openInIde(pathToBeOpened, currentIde, codeText, payload, lineToOpenInIde);
                ws_1.sendData(ws, { error: 200, type: enums_1.EWSTypes.ack });
            }
            catch (e) {
                console.error(e);
                ws_1.sendData(ws, { error: 422, type: enums_1.EWSTypes.ack });
            }
        });
    }
    function handleOpenByPathRequest(ws, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utility_1.openInIde(payload.pathToOpen, payload.editor || ide_user_input, '');
            ws_1.sendData(ws, { type: enums_1.EWSTypes.openByPath, error: 200 });
        });
    }
    function handleGetFileByPathRequest(ws, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            /*TODO: should have used ajax here*/
            /*TODO: pathToOpen => unfortunate name really*/
            let data = yield utility_1.getFileContent(payload.pathToOpen);
            ws_1.sendData(ws, { type: enums_1.EWSTypes.getFileByPath, payload: { file: data } });
        });
    }
    function handleSetFileByPathRequest(ws, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            /*TODO: should have used ajax here*/
            let data = yield utility_1.setFileContent(payload.pathToOpen, payload.file);
            ws_1.sendData(ws, { type: enums_1.EWSTypes.getFileByPath, payload: { file: data } });
        });
    }
    function handleReIndexRequest(ws) {
        return __awaiter(this, void 0, void 0, function* () {
            // await openInIde(payload.pathToOpen, payload.editor || ide_user_input, "");
            tree = scan(root, '');
            setTimeout(() => {
                ws_1.sendData(ws, { type: enums_1.EWSTypes.ack, error: 200 });
            }, 2000);
        });
    }
    function handleSearchRequest(ws, payload, type) {
        files = [];
        folders = [];
        let file = payload.file.toLowerCase();
        let pathToBeOpened;
        try {
            let foundItems = searchData(tree.items, file, false);
            /*todo: just to avoid ts error*/
            ws_1.sendData(ws, {
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
                    editor: enums_1.EIdeNames.WEBSTORM,
                    exact: false,
                    path: '',
                    pathToOpen: '',
                    searchTerm: '',
                    ext: ''
                }
            });
        }
        catch (e) {
            console.error(e);
            ws_1.sendData(ws, { error: 422, type: enums_1.EWSTypes.SEARCH });
        }
    }
    // app.get('/open', async (req: Request, res: Response) => {//path
    //   files = [];
    //   folders = [];
    //   let pathToBeOpened, codeText: string, data: any = {classList: [], id: "", tagName: "", innerText: ""};
    //   let url_parts = url.parse(req.url, true);
    //   let query = url_parts.query;
    //   pathToBeOpened = query.path;
    //   try {
    //     data = query.data && JSON.parse(<string>query.data);
    //   } catch (e) {
    //     res.status(401).send("can't parse data");
    //
    //   }
    //   codeText = query.codeText as string;
    //   let ide_clicked = query.editor;
    //   if (!pathToBeOpened) {
    //     /*if there is no path, get filename and create path*/
    //     let file = (query.file as string).toLowerCase();
    //     let isExactSearch = query.exact === "true";
    //     let searchTerm = isExactSearch ? file : file.replace('app-', '');
    //     let foundItems = searchData(tree.items, searchTerm);
    //     if (!(foundItems && foundItems.files && foundItems.files.length > 0)) {
    //       res.status(200).json({messgage: "ng-bubble: no matching file found", index: tree.items});
    //       return;
    //     }
    //     let exactMatchIndex = exactMatchedFileIndex(foundItems, searchTerm);
    //     pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : foundItems.files[0].path;
    //   }
    //
    //   try {
    //     let currentIde = ide_clicked ? ide_clicked : ide_user_input;
    //     await openInIde(pathToBeOpened, currentIde, codeText, data);
    //     // res.status(200).json("ng-bubble: success");
    //
    //   } catch (e) {
    //     console.error(e);
    //     res.status(422).send(e);
    //   }
    // });
    // app.get('/search', function (req: Request, res: Response) {//path
    //   files = [];
    //   folders = [];
    //   let url_parts = url.parse(req.url, true);
    //   let file = (url_parts.query.file as string).toLowerCase();
    //   let pathToBeOpened;
    //   try {
    //     let foundItems = searchData(tree.items, file);
    //     res.status(200).json(foundItems);
    //   } catch (e) {
    //     console.error(e);
    //     res.status(422).send(e);
    //   }
    // });
}
exports.routesInit = routesInit;
//# sourceMappingURL=routes.js.map