#!/usr/bin/env node
import * as tslib_1 from "tslib";
import { createConfigJSonFileIfNotPresent, logInfo, logServerBusyError, root, runAppOnFreePort } from './utility';
import { getLocalConfig, updateLocalConfig } from './config';
import { reIndex, websocketInit } from './routes';
import { inquirerInit } from './inquirer';
import { commanderInit } from './commander';
import { WEBSOCKET_PORT } from './constants';
var Server = require('ws').Server;
var json = require('../../../package.json');
var path = require('path');
var cors = require('cors');
var express = require('express');
var fs = require('fs');
var chokidar = require('chokidar');
var ANGULAR_SRC_PATH = path.join(root, 'src');
var watcher = chokidar.watch(ANGULAR_SRC_PATH, { ignored: /^\./, persistent: true });
console.log('test');
console.info('NG-BUBBLE:: version', json.version);
console.info('root:', root);
var wsServer;
createConfigJSonFileIfNotPresent();
var localConfig = getLocalConfig() || {};
var commanderOutput = commanderInit();
var app = express();
var httpServer = require('http').createServer(app);
app.use(cors());
var PUBLIC_DIR_PATH = path.join(__dirname, '/../../../', 'public');
app.use('/', express.static(PUBLIC_DIR_PATH));
function init(askAll) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var localConfig, inquirerOutput;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wsServer = new Server({ port: WEBSOCKET_PORT }); /*TODO: share http server*/
                    wsServer.on('error', function (error) {
                        logServerBusyError();
                    });
                    localConfig = getLocalConfig();
                    return [4 /*yield*/, inquirerInit(localConfig, askAll)];
                case 1:
                    inquirerOutput = _a.sent();
                    return [4 /*yield*/, updateLocalConfig(inquirerOutput)];
                case 2:
                    _a.sent();
                    logInfo("Your configurations: , " + JSON.stringify(getLocalConfig()));
                    Promise.all([
                        websocketInit(wsServer),
                        runAppOnFreePort(app, commanderOutput.port, commanderOutput.ctrl)
                    ])
                        .then(function () {
                        watcher
                            .on('add', function (path) {
                            console.log("Indexing " + ANGULAR_SRC_PATH);
                            reIndex();
                        })
                            .on('unlink', function (path) {
                            console.log("Indexing " + ANGULAR_SRC_PATH);
                            reIndex();
                        });
                    })
                        .catch(function (err) {
                        closeAndClean();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
process.on('SIGINT', function () {
    console.log('bye');
    closeAndClean();
});
function closeAndClean() {
    watcher.close();
    wsServer.close(function () {
        httpServer.close(function () {
            process.exit(0);
        });
    });
}
init(commanderOutput.askAll);
//# sourceMappingURL=ng-bubble.js.map