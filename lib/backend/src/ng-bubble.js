#!/usr/bin/env node
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
const config_1 = require("./config");
const routes_1 = require("./routes");
const inquirer_1 = require("./inquirer");
const commander_1 = require("./commander");
const constants_1 = require("./constants");
const Server = require('ws').Server;
const json = require('../../../package.json');
const path = require('path');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const chokidar = require('chokidar');
const ANGULAR_SRC_PATH = path.join(utility_1.root, 'src');
const watcher = chokidar.watch(ANGULAR_SRC_PATH, { ignored: /^\./, persistent: true });
console.log('test');
console.info('NG-BUBBLE:: version', json.version);
console.info('root:', utility_1.root);
let wsServer;
utility_1.createConfigJSonFileIfNotPresent();
const localConfig = config_1.getLocalConfig() || {};
let commanderOutput = commander_1.commanderInit();
let app = express();
const httpServer = require('http').createServer(app);
app.use(cors());
const PUBLIC_DIR_PATH = path.join(__dirname, '/../../../', 'public');
app.use('/', express.static(PUBLIC_DIR_PATH));
function init(askAll) {
    return __awaiter(this, void 0, void 0, function* () {
        wsServer = new Server({ port: constants_1.WEBSOCKET_PORT }); /*TODO: share http server*/
        wsServer.on('error', function (error) {
            utility_1.logServerBusyError();
        });
        let localConfig = config_1.getLocalConfig();
        let inquirerOutput = yield inquirer_1.inquirerInit(localConfig, askAll);
        yield config_1.updateLocalConfig(inquirerOutput);
        utility_1.logInfo(`Your configurations: , ${JSON.stringify(config_1.getLocalConfig())}`);
        Promise.all([
            routes_1.websocketInit(wsServer),
            utility_1.runAppOnFreePort(app, commanderOutput.port, commanderOutput.ctrl)
        ])
            .then(() => {
            watcher
                .on('add', function (path) {
                console.log(`Indexing ${ANGULAR_SRC_PATH}`);
                routes_1.reIndex();
            })
                .on('unlink', function (path) {
                console.log(`Indexing ${ANGULAR_SRC_PATH}`);
                routes_1.reIndex();
            });
        })
            .catch((err) => {
            closeAndClean();
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