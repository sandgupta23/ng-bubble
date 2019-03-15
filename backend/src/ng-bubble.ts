#!/usr/bin/env node

import {createConfigJSonFileIfNotPresent, runAppOnFreePort} from "./utility";
import {getLocalConfig, updateLocalConfig} from "./config";
import {EIdeNames} from "../enums";
import {IInquirerOutPut, ILocalConfig} from "../interfaces";
import {routesInit} from "./routes";
import {inquirerInit} from "./inquirer";

const inquirer: any = require('inquirer');

const path = require('path');
const cors = require('cors');
const express = require('express');
const fs = require('fs');

const util = require('util');


let folders: any[] = [], files: any = [];
let program = require('commander');

createConfigJSonFileIfNotPresent();
const localConfig: ILocalConfig = getLocalConfig() || {};


program
// .version(pkg.version)
    .option('--ask', 'Ask for options')
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 11637)', parseInt)
    .option('--ctrl <ctrl>', 'Enable click ctrl press along with double click')
    .option('--ide <ide>', 'ide to enable. defaults to VS code')
    .option('--options <option>', 'to make ng-bubble as you for options')
    .option('--options <option>', 'to make ng-bubble as you for options')
    .parse(process.argv);

let port = program.port || 11637;
let ctrl = program.ctrl || 'n';
let options = program.ask;
let ide_user_input = program.ide || 'vscode';
if (!(ctrl === 'y' || ctrl === 'yes' || ctrl === 'n' || ctrl === 'no')) {
    // throw "ctrl can only have: y, yes, n, no";
    console.log("ERROR: ctrl can only have: y, yes, n, no");
    throw "error";//todo
}
ctrl = ctrl === 'y' || ctrl === 'yes';

let app = express();
app.use(cors());

console.log(path.join(__dirname, '/../../', 'public'));
app.use('/', express.static(path.join(__dirname, '/../../', 'public')));
app.get('/', function(req:any, res:any) {
    res.sendFile(path.join(__dirname, '/../../', 'public', 'assets', 'index.html'));
});

async function beginInquirer() {
    // if (!localConfig.inputTaken || program.ask) {
    if (true) {
        let inquirerOutput: ILocalConfig = await inquirerInit();
        // console.log(inquirerOutput);
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
        console.log("\n Thanks. If in future you want to change these options, run: ng-bubble --ask");
        routesInit(app);
    } else {
        console.log(`Your configurations are as follows. To change run ng-bubble --ask.`);
        let {preferredIde, guess, componentSelector, ctrl} = localConfig;
        console.log({preferredIde, guess, componentSelector});
        routesInit(app);
    }
    runAppOnFreePort(app, port, ctrl);
}

beginInquirer();