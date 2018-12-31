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
const enums_1 = require("../enums");
const routes_1 = require("./routes");
const inquirer = require('inquirer');
const path = require('path');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const util = require('util');
let folders = [], files = [];
let program = require('commander');
const localConfig = config_1.getLocalConfig() || {};
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
    throw "error"; //todo
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
    inquirerPromise.then((inquirerOutput) => __awaiter(this, void 0, void 0, function* () {
        let isAngular = inquirerOutput.isAngular === 'Yes';
        let preferredIde = inquirerOutput.ide === 'Webstorm' ? enums_1.EIdeNames.WEBSTORM : enums_1.EIdeNames.VSCODE;
        let newLocalConfigData = Object.assign({}, localConfig, { isAngular, preferredIde, inputTaken: true });
        try {
            yield config_1.updateLocalConfig(newLocalConfigData);
        }
        catch (e) {
            console.log(e);
        }
        console.log("Thanks. If in future you want to change these options, run: ng-bubble --ask");
        routes_1.routesInit(app);
        utility_1.runAppOnFreePort(app, port, ctrl);
    }));
}
else {
    console.log(`You marked this as an ${localConfig.isAngular ? 'Angular' : 'Non-Angular'} project and choose ${localConfig.preferredIde} as preferred ide`);
    routes_1.routesInit(app);
    utility_1.runAppOnFreePort(app, port, ctrl);
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
//# sourceMappingURL=ng-bubble.js.map