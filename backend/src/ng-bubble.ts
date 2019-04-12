#!/usr/bin/env node

import {createConfigJSonFileIfNotPresent, runAppOnFreePort} from "./utility";
import {getLocalConfig, updateLocalConfig} from "./config";
import {IInquirerOutPut, ILocalConfig} from "../interfaces";
import {routesInit} from "./routes";
import {inquirerInit} from "./inquirer";
import {commanderInit} from './commander';
const path = require('path');
const cors = require('cors');
const express = require('express');
const fs = require('fs');


createConfigJSonFileIfNotPresent();
const localConfig: ILocalConfig = getLocalConfig() || {};

let commanderOutput = commanderInit();

// program
//     .option('--ask', 'Ask for options')
//     .option('-p, --port <port>', 'Port on which to listen to (defaults to 11637)', parseInt)
//     .option('--ctrl <ctrl>', 'Enable click ctrl press along with double click')
//     .option('--ide <ide>', 'ide to enable. defaults to VS code')
//     .option('--options <option>', 'to make ng-bubble as you for options')
//     .option('--options <option>', 'to make ng-bubble as you for options')
//     .parse(process.argv);

// let port = program.port || 11637;
// let ctrl = program.ctrl || 'n';
// let options = program.ask;
// let ide_user_input = program.ide || 'vscode';
// if (!(ctrl === 'y' || ctrl === 'yes' || ctrl === 'n' || ctrl === 'no')) {
//     // throw "ctrl can only have: y, yes, n, no";
//     
//     throw "error";//todo
// }
// ctrl = ctrl === 'y' || ctrl === 'yes';

let app = express();
app.use(cors());

const PUBLIC_DIR_PATH = path.join(__dirname, '/../../../', 'public');

app.use('/', express.static(PUBLIC_DIR_PATH));
// app.get('/', function(req:any, res:any) {
//     res.sendFile(path.join(__dirname, '/../../', 'public', 'assets', 'index.html'));
// });

async function beginInquirer() {
    // if (!localConfig.inputTaken || program.ask) {
    if (true) {
        let inquirerOutput: ILocalConfig = await inquirerInit();
        // 
        // let preferredIde: string = inquirerOutput.ide;
        // let guess: boolean = inquirerOutput.guess === 'Yes';
        // let ctrl: boolean = inquirerOutput.ctrl === 'Ctrl + Double click';
        // let componentSelector: string = inquirerOutput.componentSelector ? inquirerOutput.componentSelector : 'app-';
        let newLocalConfigData: ILocalConfig = inquirerOutput;
        // let newLocalConfigData: ILocalConfig = {
        //     ...localConfig,
        //     preferredIde,
        //     inputTaken: true,
        //     // guess,
        //     componentSelector,
        //     ctrl
        //
        // };
        await updateLocalConfig(newLocalConfigData);
        
        routesInit(app);
    } else {
        
        let {preferredIde, guess, componentSelector, ctrl} = localConfig;
        
        routesInit(app);
    }
    runAppOnFreePort(app, commanderOutput.port, commanderOutput.ctrl);
}

beginInquirer();