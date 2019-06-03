import * as tslib_1 from "tslib";
import { exactMatchedFileIndex, getFileContent, getHtmlOrTsFile, logServerBusyError, openInIde, root, setFileContent, } from './utility';
import { lineToOpen } from './line-finder';
import { getLocalConfig } from './config';
import { sendData } from './ws';
import { EIdeNames, EWSTypes } from '../enums';
var scan = require('./scan');
var path = require('path');
var folders = [], files = [];
export var SEARCH_CACHE = {};
var tree;
export function websocketInit(server) {
    return new Promise(function (resolve, reject) {
        function sendAck(ws, data) {
            sendData(ws, { type: EWSTypes.ack });
        }
        server.on('error', function (error) {
            logServerBusyError();
        });
        server.on('connection', function (ws) {
            resolve(server);
            ws.on('message', function (message) {
                var data = JSON.parse(message);
                if (data.type === EWSTypes.open) {
                    handleOpenRequest(ws, data.payload);
                }
                else if (data.type === EWSTypes.SEARCH || data.type === EWSTypes.COMPONENT_FILE_SEARCH) {
                    handleSearchRequest(ws, data.payload, data.type);
                }
                else if (data.type === EWSTypes.openByPath) {
                    handleOpenByPathRequest(ws, data.payload);
                }
                else if (data.type === EWSTypes.getFileByPath) {
                    handleGetFileByPathRequest(ws, data.payload);
                }
                else if (data.type === EWSTypes.setFileByPath) {
                    handleSetFileByPathRequest(ws, data.payload);
                }
                else if (data.type === EWSTypes.reIndex) {
                    handleReIndexRequest(ws);
                }
                else if (data.type === EWSTypes.getConfig) {
                    handleConfigRequest(ws);
                }
                else if (data.type === EWSTypes.shutDown) {
                    handleShutDOwnRequest(ws);
                }
            });
        });
        var localConfig = getLocalConfig();
        var ide_user_input = localConfig && localConfig.preferredIde;
        reIndex();
        function searchData(data, searchTerms, exact) {
            var e_1, _a;
            try {
                /*TODO: make it a pure function*/
                for (var data_1 = tslib_1.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var d = data_1_1.value;
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
                        var target = searchTerms.toLowerCase().replace(/\W/g, '');
                        var mainStr = d.name.replace(/\W/g, '').toLowerCase();
                        if (mainStr.startsWith(target)) {
                            files.push(d);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return { folders: folders, files: files };
        }
        function handleShutDOwnRequest(ws) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    sendAck(ws, { ext: "" });
                    process.exit();
                    return [2 /*return*/];
                });
            });
        }
        function handleConfigRequest(ws) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    sendData(ws, { payload: localConfig, type: EWSTypes.getConfig });
                    return [2 /*return*/];
                });
            });
        }
        function handleOpenRequest(ws, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var pathToBeOpened, codeText, ide_clicked, searchTerm, foundItems, exactMatchIndex, lineToOpenInIde, currentIde, e_2;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            files = [];
                            folders = [];
                            pathToBeOpened = payload.pathToOpen;
                            codeText = payload.codeText;
                            ide_clicked = payload.editor;
                            if (!pathToBeOpened && payload.searchTerm) {
                                searchTerm = payload.searchTerm;
                                foundItems = SEARCH_CACHE[searchTerm] || searchData(tree.items, searchTerm);
                                if (!SEARCH_CACHE[searchTerm])
                                    SEARCH_CACHE[searchTerm] = foundItems;
                                if (!(foundItems && foundItems.files && foundItems.files.length > 0)) {
                                    console.log('Could not file anything for :' + searchTerm);
                                    sendData(ws, { error: 401, errorMessage: 'ng-bubble: no matching file found', type: EWSTypes.open });
                                    return [2 /*return*/];
                                }
                                exactMatchIndex = exactMatchedFileIndex(foundItems, searchTerm);
                                pathToBeOpened = exactMatchIndex !== -1 ? foundItems.files[exactMatchIndex].path : getHtmlOrTsFile(foundItems.files) /*foundItems.files[0].path*/;
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, lineToOpen(pathToBeOpened, payload)];
                        case 2:
                            lineToOpenInIde = (_a.sent()) || 0;
                            currentIde = ide_clicked ? ide_clicked : ide_user_input;
                            return [4 /*yield*/, openInIde(pathToBeOpened, currentIde, codeText, payload, lineToOpenInIde)];
                        case 3:
                            _a.sent();
                            sendData(ws, { error: 200, type: EWSTypes.ack });
                            return [3 /*break*/, 5];
                        case 4:
                            e_2 = _a.sent();
                            //console.error(e);
                            sendData(ws, { error: 422, type: EWSTypes.ack });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        function handleOpenByPathRequest(ws, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, openInIde(payload.pathToOpen, payload.editor || ide_user_input, '')];
                        case 1:
                            _a.sent();
                            sendData(ws, { type: EWSTypes.openByPath, error: 200 });
                            return [2 /*return*/];
                    }
                });
            });
        }
        function handleGetFileByPathRequest(ws, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var data;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getFileContent(payload.pathToOpen)];
                        case 1:
                            data = _a.sent();
                            sendData(ws, { type: EWSTypes.getFileByPath, payload: { file: data } });
                            return [2 /*return*/];
                    }
                });
            });
        }
        function handleSetFileByPathRequest(ws, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var data;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, setFileContent(payload.pathToOpen, payload.file)];
                        case 1:
                            data = _a.sent();
                            sendData(ws, { type: EWSTypes.getFileByPath, payload: { file: data } });
                            return [2 /*return*/];
                    }
                });
            });
        }
        function handleReIndexRequest(ws) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    // await openInIde(payload.pathToOpen, payload.editor || ide_user_input, "");
                    tree = scan(root, '');
                    setTimeout(function () {
                        sendData(ws, { type: EWSTypes.ack, error: 200 });
                    }, 2000);
                    return [2 /*return*/];
                });
            });
        }
        function handleSearchRequest(ws, payload, type) {
            files = [];
            folders = [];
            var file = payload.file.toLowerCase();
            var pathToBeOpened;
            try {
                var foundItems = searchData(tree.items, file, false);
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
            }
            catch (e) {
                //console.error(e);
                sendData(ws, { error: 422, type: EWSTypes.SEARCH });
            }
        }
    });
}
export function reIndex() {
    tree = scan(root, '');
}
//# sourceMappingURL=routes.js.map