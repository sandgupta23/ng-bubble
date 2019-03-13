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
const inquirer = require('inquirer');
const path = require('path');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const util = require('util');
let folders = [], files = [];
let program = require('commander');
utility_1.createConfigJSonFileIfNotPresent();
const localConfig = config_1.getLocalConfig() || {};
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
    throw "error"; //todo
}
ctrl = ctrl === 'y' || ctrl === 'yes';
let app = express();
app.use(cors());
console.log(path.join(__dirname, '/../../', 'public'));
app.use('/', express.static(path.join(__dirname, '/../../', 'public')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../', 'public', 'assets', 'index.html'));
});
function beginInquirer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!localConfig.inputTaken || program.ask) {
            let inquirerOutput = yield inquirer_1.inquirerInit();
            let preferredIde = inquirerOutput.ide;
            let guess = inquirerOutput.guess === 'Yes';
            let ctrl = inquirerOutput.ctrl === 'Ctrl + Double click';
            let componentSelector = inquirerOutput.componentSelector ? inquirerOutput.componentSelector : 'app-';
            let newLocalConfigData = Object.assign({}, localConfig, { preferredIde, inputTaken: true, guess,
                componentSelector,
                ctrl });
            yield config_1.updateLocalConfig(newLocalConfigData);
            console.log("Thanks. If in future you want to change these options, run: ng-bubble --ask");
            routes_1.routesInit(app);
        }
        else {
            console.log(`Your configurations are as follows. To change run ng-bubble --ask.`);
            let { preferredIde, guess, componentSelector, ctrl } = localConfig;
            console.log({ preferredIde, guess, componentSelector });
            routes_1.routesInit(app);
        }
        utility_1.runAppOnFreePort(app, port, ctrl);
    });
}
beginInquirer();
//# sourceMappingURL=ng-bubble.js.map