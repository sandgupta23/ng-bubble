#!/usr/bin/env node

import {createConfigJSonFileIfNotPresent, logInfo, logServerBusyError, root, runAppOnFreePort} from './utility';
import {getLocalConfig, updateLocalConfig} from './config';
import {ILocalConfig} from '../interfaces';
import {reIndex, websocketInit} from './routes';
import {inquirerInit} from './inquirer';
import {commanderInit} from './commander';
import {scan} from 'rxjs/operators';
import {WEBSOCKET_PORT} from './constants';

const Server = require('ws').Server;
const json = require('../../../package.json');

const path = require('path');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const chokidar = require('chokidar');
const ANGULAR_SRC_PATH = path.join(root, 'src');
const watcher = chokidar.watch(ANGULAR_SRC_PATH, {ignored: /^\./, persistent: true});
console.info('NG-BUBBLE:: version', json.version);
console.info('root:', root);
let wsServer: any;
createConfigJSonFileIfNotPresent();
const localConfig: ILocalConfig = getLocalConfig() || {};
const commanderOutput = commanderInit();

const app = express();
const httpServer = require('http').createServer(app);
app.use(cors());

const PUBLIC_DIR_PATH = path.join(__dirname, '/../../../', 'public');
app.use('/', express.static(PUBLIC_DIR_PATH));


async function init(askAll: boolean) {
  wsServer = new Server({port: WEBSOCKET_PORT}); /*TODO: share http server*/
  wsServer.on('error', function (error: any) {/*todo: there is no wat to know if wsServer created succesfully?*/
    logServerBusyError();
  });
  const localConfig = getLocalConfig();
  const inquirerOutput: ILocalConfig = await inquirerInit(localConfig, askAll);
  await updateLocalConfig(inquirerOutput);
  logInfo(`Your configurations: , ${JSON.stringify(getLocalConfig())}`);
  Promise.all([
    websocketInit(wsServer),
    runAppOnFreePort(app, commanderOutput.port, commanderOutput.ctrl)
  ])
    .then(() => {
      watcher
        .on('add', function (path: string) {
          console.log(`Indexing ${ANGULAR_SRC_PATH}`);
          reIndex();
        })
        .on('unlink', function (path: string) {
          console.log(`Indexing ${ANGULAR_SRC_PATH}`);
          reIndex();
        });
    })
    .catch((err) => {
      closeAndClean();
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

init(commanderOutput.askAll).then();
