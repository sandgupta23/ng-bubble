#!/usr/bin/env node

import {runAppOnFreePort} from "./utility";
import {getLocalConfig, updateLocalConfig} from "./config";
import {EIdeNames} from "../enums";
import {ILocalConfig} from "../interfaces";
import {routesInit} from "./routes";

const inquirer: any = require('inquirer');

const path = require('path');
const cors = require('cors');
const express = require('express');
const fs = require('fs');

const util = require('util');


let folders: any[] = [], files: any = [];
let program = require('commander');

const localConfig: ILocalConfig = getLocalConfig() || {};

program
// .version(pkg.version)
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 11637)', parseInt)
    .option('--ctrl <ctrl>', 'Enable click ctrl press along with doubleclick')
    .option('--ide <ide>', 'ide to enable. defaults to VS code')
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
app.use('/', express.static(path.join(__dirname, 'public')));

if (!localConfig.inputTaken || options) {
    let inquirerPromise = inquirer.prompt([{
        type: 'list',
        message: 'What ide you want to use?',
        name: 'ide',
        choices: ["Webstorm", "VScode"]
    }, {
        type: 'list',
        message: 'Is this an Angular 2+ project?',
        name: 'isAngular',
        choices: ["Yes", "No"]
    }
    ]);
    inquirerPromise.then(async (inquirerOutput: { ide: string, isAngular: string }) => {
        let isAngular = inquirerOutput.isAngular === 'Yes';
        let preferredIde:string = inquirerOutput.ide === 'Webstorm' ? EIdeNames.WEBSTORM : EIdeNames.VSCODE;
        let newLocalConfigData: ILocalConfig = {...localConfig, isAngular, preferredIde, inputTaken: true, };
        try {
            await updateLocalConfig(newLocalConfigData);
        } catch (e) {
            console.log(e);
        }
        console.log("Thanks. If in future you want to change these options, run: ng-bubble --ask");
        routesInit(app);
        runAppOnFreePort(app, port, ctrl);
    });
} else {
    console.log(`You marked this as an ${localConfig.isAngular?'Angular':'Non-Angular'} project and choose ${localConfig.preferredIde} as preferred ide`);
    routesInit(app);
    runAppOnFreePort(app, port, ctrl);
}


// function findPathByFileName(fileName: string) {
//     let absolutePathsOfAllHtmlFilesInProvidedDir = htmlsDebug.split(',');
//     // let fileName = this.constructor.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1.').toLowerCase();
//     let fileNameDelimitedArr = fileName.toLowerCase().split('-');
//     fileName =
//         fileNameDelimitedArr.slice(0, fileNameDelimitedArr.length).join('-') + '.component.html';
//     fileName = fileName.replace('app-', '');
//     return absolutePathsOfAllHtmlFilesInProvidedDir.find((name:string) => name.includes(fileName));
// }


